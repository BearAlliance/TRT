import { randomBytes, randomUUID } from 'node:crypto'
import { readFile, rename, rm } from 'node:fs/promises'
import path from 'node:path'
import type Database from 'better-sqlite3'
import type { FastifyReply, FastifyRequest } from 'fastify'
import sharp from 'sharp'
import { hashSession, passwordMatches } from './auth'
import type { CmsConfig, InventoryItemRow, Upload } from './types'

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000
const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])

type Reply = { code: (status: number) => { send: (body?: unknown) => unknown } }

function inputError(message: string) {
  const error = new Error(message) as Error & { statusCode: number }
  error.statusCode = 400
  return error
}

function validText(value: unknown, label: string, maximum: number) {
  if (typeof value !== 'string' || !value.trim())
    throw inputError(`${label} is required.`)
  const trimmed = value.trim()
  if (trimmed.length > maximum)
    throw inputError(`${label} must be ${maximum} characters or fewer.`)
  return trimmed
}

async function readMultipart(
  request: FastifyRequest,
): Promise<{ description?: string; image: Upload; title?: string }> {
  let title: string | undefined
  let description: string | undefined
  let image: Upload
  for await (const part of request.parts()) {
    if (part.type === 'file') {
      if (!part.filename) {
        await part.toBuffer()
        continue
      }
      if (part.fieldname !== 'image' || image)
        throw inputError('Upload one image only.')
      if (!allowedImageTypes.has(part.mimetype))
        throw inputError('Use a JPG, PNG, or WebP image.')
      image = { buffer: await part.toBuffer(), mimetype: part.mimetype }
    } else if (part.fieldname === 'title') {
      title = typeof part.value === 'string' ? part.value : undefined
    } else if (part.fieldname === 'description') {
      description = typeof part.value === 'string' ? part.value : undefined
    }
  }
  return { description, image, title }
}

export function createCmsHandlers({
  config,
  db,
  uploadsDir,
}: {
  config: CmsConfig
  db: Database.Database
  uploadsDir: string
}) {
  const itemResponse = (item: InventoryItemRow, request: FastifyRequest) => ({
    createdAt: new Date(item.created_at).toISOString(),
    description: item.description,
    id: item.id,
    imageUrl: `${config.publicApiUrl ?? `${request.protocol}://${request.headers.host}`}/media/${item.image_filename}`,
    title: item.title,
    updatedAt: new Date(item.updated_at).toISOString(),
  })
  const getItems = () =>
    db
      .prepare(
        'SELECT * FROM inventory_items ORDER BY position ASC, created_at DESC',
      )
      .all() as InventoryItemRow[]
  const authenticate = async (request: FastifyRequest, reply: Reply) => {
    const token = request.cookies.inventory_session
    if (!token)
      return reply.code(401).send({ error: 'Authentication required.' })
    const hash = hashSession(token, config.sessionSecret)
    const session = db
      .prepare('SELECT expires_at FROM sessions WHERE token_hash = ?')
      .get(hash) as { expires_at: number } | undefined
    if (!session || session.expires_at < Date.now()) {
      if (session)
        db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(hash)
      return reply.code(401).send({ error: 'Authentication required.' })
    }
  }
  const requireAllowedOrigin = async (
    request: FastifyRequest,
    reply: Reply,
  ) => {
    if (
      !request.headers.origin ||
      !config.allowedOrigins.includes(request.headers.origin)
    )
      return reply.code(403).send({ error: 'Invalid request origin.' })
  }
  const saveImage = async (upload: Upload) => {
    if (!upload) throw inputError('An image is required.')
    const filename = `${randomUUID()}.webp`
    const temporaryPath = path.join(uploadsDir, `${filename}.tmp`)
    try {
      await sharp(upload.buffer)
        .rotate()
        .resize({
          width: 1600,
          height: 1200,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: 82 })
        .toFile(temporaryPath)
      await rename(temporaryPath, path.join(uploadsDir, filename))
      return filename
    } catch {
      await rm(temporaryPath, { force: true })
      throw inputError('The uploaded file is not a valid image.')
    }
  }

  return {
    authenticate,
    requireAllowedOrigin,
    health: async () => ({ ok: true }),
    getPublicInventory: async (request: FastifyRequest) => ({
      items: getItems().map((item) => itemResponse(item, request)),
    }),
    getMedia: async (request: FastifyRequest, reply: FastifyReply) => {
      const { filename } = request.params as { filename: string }
      if (!/^[0-9a-f-]{36}\.webp$/.test(filename)) return reply.code(404).send()
      try {
        return reply
          .type('image/webp')
          .header('Cache-Control', 'public, max-age=31536000, immutable')
          .send(await readFile(path.join(uploadsDir, filename)))
      } catch {
        return reply.code(404).send()
      }
    },
    login: async (request: FastifyRequest, reply: FastifyReply) => {
      const body = request.body as { password?: unknown; username?: unknown }
      if (
        body?.username !== config.username ||
        typeof body.password !== 'string' ||
        !passwordMatches(body.password, config.passwordHash)
      )
        return reply.code(401).send({ error: 'Invalid username or password.' })
      const token = randomBytes(32).toString('base64url')
      const expiresAt = Date.now() + SESSION_DURATION_MS
      db.prepare('DELETE FROM sessions WHERE expires_at < ?').run(Date.now())
      db.prepare(
        'INSERT INTO sessions (token_hash, expires_at) VALUES (?, ?)',
      ).run(hashSession(token, config.sessionSecret), expiresAt)
      reply.setCookie('inventory_session', token, {
        domain: config.cookieDomain,
        httpOnly: true,
        maxAge: SESSION_DURATION_MS / 1000,
        path: '/',
        sameSite: config.cookieSameSite,
        secure: config.secureCookies,
      })
      return { ok: true }
    },
    logout: async (_request: FastifyRequest, reply: FastifyReply) => {
      reply.clearCookie('inventory_session', {
        domain: config.cookieDomain,
        path: '/',
      })
      return { ok: true }
    },
    getAdminInventory: async (request: FastifyRequest) => ({
      items: getItems().map((item) => itemResponse(item, request)),
    }),
    createInventoryItem: async (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => {
      const fields = await readMultipart(request)
      const title = validText(fields.title, 'Title', 160)
      const description = validText(fields.description, 'Description', 4000)
      const imageFilename = await saveImage(fields.image)
      const id = randomUUID()
      const now = Date.now()
      const position = (
        db
          .prepare(
            'SELECT COALESCE(MAX(position), 0) + 1 AS position FROM inventory_items',
          )
          .get() as { position: number }
      ).position
      db.prepare(
        'INSERT INTO inventory_items (id, title, description, image_filename, position, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      ).run(id, title, description, imageFilename, position, now, now)
      return reply.code(201).send({
        item: itemResponse(
          db
            .prepare('SELECT * FROM inventory_items WHERE id = ?')
            .get(id) as InventoryItemRow,
          request,
        ),
      })
    },
    updateInventoryItem: async (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => {
      const { id } = request.params as { id: string }
      const existing = db
        .prepare('SELECT * FROM inventory_items WHERE id = ?')
        .get(id) as InventoryItemRow | undefined
      if (!existing) return reply.code(404).send({ error: 'Item not found.' })
      const fields = await readMultipart(request)
      const title = validText(fields.title, 'Title', 160)
      const description = validText(fields.description, 'Description', 4000)
      const imageFilename = fields.image
        ? await saveImage(fields.image)
        : existing.image_filename
      db.prepare(
        'UPDATE inventory_items SET title = ?, description = ?, image_filename = ?, updated_at = ? WHERE id = ?',
      ).run(title, description, imageFilename, Date.now(), id)
      if (fields.image)
        await rm(path.join(uploadsDir, existing.image_filename), {
          force: true,
        })
      return {
        item: itemResponse(
          db
            .prepare('SELECT * FROM inventory_items WHERE id = ?')
            .get(id) as InventoryItemRow,
          request,
        ),
      }
    },
    reorderInventory: async (request: FastifyRequest, reply: FastifyReply) => {
      const body = request.body as { ids?: unknown }
      if (
        !Array.isArray(body?.ids) ||
        !body.ids.every((id) => typeof id === 'string')
      )
        throw inputError('Inventory order must include item IDs.')
      const ids = body.ids as string[]
      const storedIds = (
        db.prepare('SELECT id FROM inventory_items').all() as { id: string }[]
      ).map((item) => item.id)
      if (
        ids.length !== storedIds.length ||
        new Set(ids).size !== ids.length ||
        ids.some((id) => !storedIds.includes(id))
      )
        return reply
          .code(400)
          .send({ error: 'Inventory items changed. Refresh and try again.' })
      db.transaction((orderedIds: string[]) => {
        const update = db.prepare(
          'UPDATE inventory_items SET position = ? WHERE id = ?',
        )
        orderedIds.forEach((id, index) => update.run(index + 1, id))
      })(ids)
      return { ok: true }
    },
    deleteInventoryItem: async (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => {
      const { id } = request.params as { id: string }
      const item = db
        .prepare('SELECT * FROM inventory_items WHERE id = ?')
        .get(id) as InventoryItemRow | undefined
      if (!item) return reply.code(404).send({ error: 'Item not found.' })
      db.prepare('DELETE FROM inventory_items WHERE id = ?').run(id)
      await rm(path.join(uploadsDir, item.image_filename), { force: true })
      return reply.code(204).send()
    },
  }
}
