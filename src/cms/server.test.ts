import { mkdtemp, rm } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import sharp from 'sharp'
import { createCmsApp, hashPassword } from './server'

function multipartBody(fields: Record<string, string>, image?: Buffer) {
  const boundary = 'trt-inventory-test-boundary'
  const textFields = Object.entries(fields).flatMap(([name, value]) => [
    Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`,
    ),
  ])
  const imagePart = image
    ? [
        Buffer.from(
          `--${boundary}\r\nContent-Disposition: form-data; name="image"; filename="bike.png"\r\nContent-Type: image/png\r\n\r\n`,
        ),
        image,
      ]
    : [
        Buffer.from(
          `--${boundary}\r\nContent-Disposition: form-data; name="image"\r\n\r\n\r\n`,
        ),
      ]
  return {
    body: Buffer.concat([
      ...textFields,
      ...imagePart,
      Buffer.from(`\r\n--${boundary}--\r\n`),
    ]),
    contentType: `multipart/form-data; boundary=${boundary}`,
  }
}

describe('inventory CMS API', () => {
  let dataDir: string

  beforeEach(async () => {
    dataDir = await mkdtemp(path.join(os.tmpdir(), 'trt-cms-'))
    process.env.CMS_USERNAME = 'inventory-admin'
    process.env.CMS_PASSWORD_HASH = hashPassword('correct horse battery staple')
    process.env.CMS_SESSION_SECRET =
      'a test secret that is long enough to sign sessions'
  })

  afterEach(async () => {
    await rm(dataDir, { force: true, recursive: true })
  })

  it('requires login, then creates, lists, and deletes an inventory item', async () => {
    const app = await createCmsApp({
      allowedOrigins: ['http://localhost:3000'],
      cookieSameSite: 'none',
      dataDir,
      publicApiUrl: 'http://localhost:4000',
      secureCookies: false,
    })
    const headers = { origin: 'http://localhost:3000' }
    const unauthenticated = await app.inject({
      method: 'GET',
      url: '/v1/admin/inventory',
    })
    expect(unauthenticated.statusCode).toBe(401)

    const login = await app.inject({
      headers,
      method: 'POST',
      payload: {
        password: 'correct horse battery staple',
        username: 'inventory-admin',
      },
      url: '/v1/auth/login',
    })
    expect(login.statusCode).toBe(200)
    const setCookie = login.headers['set-cookie']
    const sessionCookie = (
      Array.isArray(setCookie) ? setCookie[0] : setCookie
    )?.split(';')[0]
    expect(sessionCookie).toBeTruthy()
    expect(login.headers['set-cookie']).toContain('SameSite=None')

    const image = await sharp({
      create: { background: '#123456', channels: 3, height: 40, width: 40 },
    })
      .png()
      .toBuffer()
    const upload = multipartBody(
      { description: 'A great bike.', title: 'Demo bike' },
      image,
    )
    const created = await app.inject({
      headers: {
        ...headers,
        'content-type': upload.contentType,
        cookie: sessionCookie,
      },
      method: 'POST',
      payload: upload.body,
      url: '/v1/admin/inventory',
    })
    expect(created.statusCode).toBe(201)
    const item = (created.json() as { item: { id: string; imageUrl: string } })
      .item
    expect(item.imageUrl).toMatch(/\/media\/[0-9a-f-]+\.webp$/)

    const listed = await app.inject({ method: 'GET', url: '/v1/inventory' })
    expect(listed.json()).toMatchObject({
      items: [expect.objectContaining({ id: item.id, title: 'Demo bike' })],
    })

    const update = multipartBody({
      description: 'Still a great bike.',
      title: 'Updated demo bike',
    })
    const updated = await app.inject({
      headers: {
        ...headers,
        'content-type': update.contentType,
        cookie: sessionCookie,
      },
      method: 'PATCH',
      payload: update.body,
      url: `/v1/admin/inventory/${item.id}`,
    })
    expect(updated.statusCode).toBe(200)
    expect(updated.json()).toMatchObject({
      item: expect.objectContaining({ title: 'Updated demo bike' }),
    })

    const reordered = await app.inject({
      headers: { ...headers, cookie: sessionCookie },
      method: 'POST',
      payload: { ids: [item.id] },
      url: '/v1/admin/inventory/order',
    })
    expect(reordered.statusCode).toBe(200)

    const removed = await app.inject({
      headers: { ...headers, cookie: sessionCookie },
      method: 'DELETE',
      url: `/v1/admin/inventory/${item.id}`,
    })
    expect(removed.statusCode).toBe(204)
    await app.close()
  })

  it('allows browser PATCH requests from the local site', async () => {
    const app = await createCmsApp({
      allowedOrigins: ['http://localhost:3000'],
      dataDir,
      secureCookies: false,
    })
    const preflight = await app.inject({
      headers: {
        'access-control-request-headers': 'content-type',
        'access-control-request-method': 'PATCH',
        origin: 'http://localhost:3000',
      },
      method: 'OPTIONS',
      url: '/v1/admin/inventory/example-id',
    })
    expect(preflight.statusCode).toBe(204)
    expect(preflight.headers['access-control-allow-methods']).toContain('PATCH')
    await app.close()
  })
})
