import {
  createHash,
  randomBytes,
  randomUUID,
  scryptSync,
  timingSafeEqual,
} from 'node:crypto'
import { mkdir, readFile, rename, rm } from 'node:fs/promises'
import path from 'node:path'
import Database from 'better-sqlite3'
import cookie from '@fastify/cookie'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import rateLimit from '@fastify/rate-limit'
import Fastify, { type FastifyInstance, type FastifyRequest } from 'fastify'
import sharp from 'sharp'

const MAX_IMAGE_BYTES = 10 * 1024 * 1024
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000
const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])

type Config = {
  allowedOrigins: string[]
  cookieDomain?: string
  dataDir: string
  passwordHash: string
  publicApiUrl?: string
  secureCookies: boolean
  sessionSecret: string
  username: string
}

type InventoryItemRow = {
  created_at: number
  description: string
  id: string
  image_filename: string
  title: string
  updated_at: number
}

type Upload = { buffer: Buffer; mimetype: string } | undefined

function configFromEnvironment(): Config {
  const required = (key: string) => {
    const value = process.env[key]
    if (!value) throw new Error(`${key} must be configured.`)
    return value
  }

  return {
    allowedOrigins: (process.env.CMS_ALLOWED_ORIGINS ?? 'http://localhost:3000')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
    cookieDomain: process.env.CMS_COOKIE_DOMAIN,
    dataDir: process.env.DATA_DIR ?? path.join(process.cwd(), '.data'),
    passwordHash: required('CMS_PASSWORD_HASH'),
    publicApiUrl: process.env.PUBLIC_API_URL?.replace(/\/$/, ''),
    secureCookies: process.env.NODE_ENV === 'production',
    sessionSecret: required('CMS_SESSION_SECRET'),
    username: required('CMS_USERNAME'),
  }
}

function hashSession(token: string, secret: string) {
  return createHash('sha256').update(`${secret}:${token}`).digest('hex')
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex')
  const key = scryptSync(password, salt, 64).toString('hex')
  return `scrypt$${salt}$${key}`
}

function passwordMatches(password: string, encoded: string) {
  const [algorithm, salt, expected] = encoded.split('$')
  if (algorithm !== 'scrypt' || !salt || !expected) return false
  const actual = scryptSync(password, salt, 64).toString('hex')
  return timingSafeEqual(Buffer.from(actual), Buffer.from(expected))
}

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

async function readMultipart(request: FastifyRequest): Promise<{
  description?: string
  image: Upload
  title?: string
}> {
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

export async function createCmsApp(
  overrides?: Partial<Config>,
): Promise<FastifyInstance> {
  const config = { ...configFromEnvironment(), ...overrides }
  const uploadsDir = path.join(config.dataDir, 'uploads')
  await mkdir(uploadsDir, { recursive: true })

  const db = new Database(path.join(config.dataDir, 'inventory.sqlite'))
  db.pragma('journal_mode = WAL')
  db.exec(`
    CREATE TABLE IF NOT EXISTS inventory_items (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image_filename TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY,
      expires_at INTEGER NOT NULL
    );
  `)

  const app = Fastify({ logger: true })
  await app.register(cookie, { secret: config.sessionSecret })
  await app.register(cors, {
    allowedHeaders: ['Content-Type'],
    credentials: true,
    methods: ['GET', 'HEAD', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    origin: (origin, callback) =>
      callback(null, !origin || config.allowedOrigins.includes(origin)),
  })
  await app.register(multipart, {
    limits: { files: 1, fileSize: MAX_IMAGE_BYTES },
  })
  await app.register(rateLimit, { global: false })
  app.setErrorHandler((error, _request, reply) => {
    const knownError = error as Error & { statusCode?: number }
    const statusCode =
      knownError.statusCode && knownError.statusCode >= 400
        ? knownError.statusCode
        : 500
    const message =
      statusCode >= 500
        ? 'Something went wrong. Please try again.'
        : knownError.message
    return reply.code(statusCode).send({ error: message })
  })

  const itemResponse = (item: InventoryItemRow, request: FastifyRequest) => ({
    createdAt: new Date(item.created_at).toISOString(),
    description: item.description,
    id: item.id,
    imageUrl: `${config.publicApiUrl ?? `${request.protocol}://${request.headers.host}`}/media/${item.image_filename}`,
    title: item.title,
    updatedAt: new Date(item.updated_at).toISOString(),
  })

  const authenticate = async (
    request: FastifyRequest,
    reply: { code: (status: number) => { send: (body: unknown) => unknown } },
  ) => {
    const token = request.cookies.inventory_session
    if (!token)
      return reply.code(401).send({ error: 'Authentication required.' })
    const row = db
      .prepare('SELECT expires_at FROM sessions WHERE token_hash = ?')
      .get(hashSession(token, config.sessionSecret)) as
      { expires_at: number } | undefined
    if (!row || row.expires_at < Date.now()) {
      if (row)
        db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(
          hashSession(token, config.sessionSecret),
        )
      return reply.code(401).send({ error: 'Authentication required.' })
    }
  }

  const requireAllowedOrigin = async (
    request: FastifyRequest,
    reply: { code: (status: number) => { send: (body: unknown) => unknown } },
  ) => {
    const origin = request.headers.origin
    if (!origin || !config.allowedOrigins.includes(origin))
      return reply.code(403).send({ error: 'Invalid request origin.' })
  }

  const saveImage = async (upload: Upload) => {
    if (!upload) throw inputError('An image is required.')
    const filename = `${randomUUID()}.webp`
    const temporaryPath = path.join(uploadsDir, `${filename}.tmp`)
    const destination = path.join(uploadsDir, filename)
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
      await rename(temporaryPath, destination)
      return filename
    } catch {
      await rm(temporaryPath, { force: true })
      throw inputError('The uploaded file is not a valid image.')
    }
  }

  app.get('/health', async () => ({ ok: true }))
  app.get('/v1/inventory', async (request) => {
    const rows = db
      .prepare('SELECT * FROM inventory_items ORDER BY created_at DESC')
      .all() as InventoryItemRow[]
    return { items: rows.map((row) => itemResponse(row, request)) }
  })
  app.get('/media/:filename', async (request, reply) => {
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
  })

  app.post(
    '/v1/auth/login',
    {
      preHandler: requireAllowedOrigin,
      config: { rateLimit: { max: 5, timeWindow: '15 minutes' } },
    },
    async (request, reply) => {
      const body = request.body as { password?: unknown; username?: unknown }
      if (
        body?.username !== config.username ||
        typeof body.password !== 'string' ||
        !passwordMatches(body.password, config.passwordHash)
      ) {
        return reply.code(401).send({ error: 'Invalid username or password.' })
      }
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
        sameSite: 'lax',
        secure: config.secureCookies,
      })
      return { ok: true }
    },
  )
  app.post(
    '/v1/auth/logout',
    { preHandler: [authenticate, requireAllowedOrigin] },
    async (_request, reply) => {
      reply.clearCookie('inventory_session', {
        domain: config.cookieDomain,
        path: '/',
      })
      return { ok: true }
    },
  )
  app.get(
    '/v1/admin/inventory',
    { preHandler: authenticate },
    async (request) => {
      const rows = db
        .prepare('SELECT * FROM inventory_items ORDER BY created_at DESC')
        .all() as InventoryItemRow[]
      return { items: rows.map((row) => itemResponse(row, request)) }
    },
  )
  app.post(
    '/v1/admin/inventory',
    { preHandler: [authenticate, requireAllowedOrigin] },
    async (request, reply) => {
      const fields = await readMultipart(request)
      const title = validText(fields.title, 'Title', 160)
      const description = validText(fields.description, 'Description', 4000)
      const imageFilename = await saveImage(fields.image)
      const id = randomUUID()
      const now = Date.now()
      db.prepare(
        'INSERT INTO inventory_items (id, title, description, image_filename, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
      ).run(id, title, description, imageFilename, now, now)
      const item = db
        .prepare('SELECT * FROM inventory_items WHERE id = ?')
        .get(id) as InventoryItemRow
      return reply.code(201).send({ item: itemResponse(item, request) })
    },
  )
  app.patch(
    '/v1/admin/inventory/:id',
    { preHandler: [authenticate, requireAllowedOrigin] },
    async (request, reply) => {
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
      const item = db
        .prepare('SELECT * FROM inventory_items WHERE id = ?')
        .get(id) as InventoryItemRow
      return { item: itemResponse(item, request) }
    },
  )
  app.delete(
    '/v1/admin/inventory/:id',
    { preHandler: [authenticate, requireAllowedOrigin] },
    async (request, reply) => {
      const { id } = request.params as { id: string }
      const item = db
        .prepare('SELECT * FROM inventory_items WHERE id = ?')
        .get(id) as InventoryItemRow | undefined
      if (!item) return reply.code(404).send({ error: 'Item not found.' })
      db.prepare('DELETE FROM inventory_items WHERE id = ?').run(id)
      await rm(path.join(uploadsDir, item.image_filename), { force: true })
      return reply.code(204).send()
    },
  )

  app.addHook('onClose', () => db.close())
  return app
}

async function start() {
  const app = await createCmsApp()
  await app.listen({ host: '0.0.0.0', port: Number(process.env.PORT ?? 4000) })
}

if (require.main === module) void start()
