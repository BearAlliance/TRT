import { createReadStream, existsSync, statSync } from 'node:fs'
import { access, readFile } from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const buildDir = path.join(rootDir, 'build')
const port = Number.parseInt(process.env.PORT ?? '3000', 10)

const contentTypes = new Map([
  ['.avif', 'image/avif'],
  ['.css', 'text/css; charset=utf-8'],
  ['.gif', 'image/gif'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webp', 'image/webp'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
  ['.xml', 'application/xml; charset=utf-8'],
])

function getContentType(filePath) {
  return (
    contentTypes.get(path.extname(filePath).toLowerCase()) ??
    'application/octet-stream'
  )
}

function safeJoin(root, requestPath) {
  const targetPath = path.normalize(path.join(root, requestPath))
  return targetPath.startsWith(root) ? targetPath : null
}

async function resolvePath(requestUrl) {
  const pathname = decodeURIComponent(
    new URL(requestUrl, `http://localhost:${port}`).pathname,
  )
  const requestPath = pathname === '/' ? '/index.html' : pathname
  const directPath = safeJoin(buildDir, requestPath)

  if (directPath && existsSync(directPath)) {
    const stats = statSync(directPath)
    return stats.isDirectory()
      ? path.join(directPath, 'index.html')
      : directPath
  }

  const htmlPath = safeJoin(buildDir, `${pathname}.html`)
  if (htmlPath && existsSync(htmlPath)) {
    return htmlPath
  }

  const indexPath = safeJoin(buildDir, path.join(pathname, 'index.html'))
  if (indexPath && existsSync(indexPath)) {
    return indexPath
  }

  return null
}

async function send404(response) {
  const fallbackPath = path.join(buildDir, '404.html')

  if (existsSync(fallbackPath)) {
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
    response.end(await readFile(fallbackPath))
    return
  }

  response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
  response.end('Not found')
}

await access(buildDir)

const server = http.createServer(async (request, response) => {
  if (!request.url) {
    response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Bad request')
    return
  }

  try {
    const filePath = await resolvePath(request.url)

    if (!filePath || !existsSync(filePath)) {
      await send404(response)
      return
    }

    response.writeHead(200, {
      'Content-Type': getContentType(filePath),
      'Cache-Control': 'no-cache',
    })
    createReadStream(filePath).pipe(response)
  } catch (error) {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end(
      error instanceof Error ? error.message : 'Unexpected server error',
    )
  }
})

server.listen(port, () => {
  console.log(`Serving ${buildDir} at http://localhost:${port}`)
})
