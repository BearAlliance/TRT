import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import Database from 'better-sqlite3'
import cookie from '@fastify/cookie'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import rateLimit from '@fastify/rate-limit'
import Fastify, { type FastifyInstance } from 'fastify'
import { hashPassword } from './auth'
import { configFromEnvironment } from './config'
import { createCmsHandlers } from './handlers'
import { registerCmsRoutes } from './routes'
import type { CmsConfig } from './types'

export { hashPassword }

export async function createCmsApp(
  overrides?: Partial<CmsConfig>,
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
      position INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY,
      expires_at INTEGER NOT NULL
    );
  `)
  const columns = db.prepare('PRAGMA table_info(inventory_items)').all() as {
    name: string
  }[]
  if (!columns.some((column) => column.name === 'position')) {
    db.exec(
      'ALTER TABLE inventory_items ADD COLUMN position INTEGER NOT NULL DEFAULT 0',
    )
  }
  db.exec('UPDATE inventory_items SET position = rowid WHERE position = 0')

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
    limits: { files: 1, fileSize: 10 * 1024 * 1024 },
  })
  await app.register(rateLimit, { global: false })
  app.setErrorHandler((error, _request, reply) => {
    const knownError = error as Error & { statusCode?: number }
    const statusCode =
      knownError.statusCode && knownError.statusCode >= 400
        ? knownError.statusCode
        : 500
    return reply.code(statusCode).send({
      error:
        statusCode >= 500
          ? 'Something went wrong. Please try again.'
          : knownError.message,
    })
  })
  registerCmsRoutes(app, createCmsHandlers({ config, db, uploadsDir }))
  app.addHook('onClose', () => db.close())
  return app
}

async function start() {
  const app = await createCmsApp()
  await app.listen({ host: '0.0.0.0', port: Number(process.env.PORT ?? 4000) })
}

if (require.main === module) void start()
