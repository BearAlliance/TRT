import path from 'node:path'
import type { CmsConfig } from './types'

export function configFromEnvironment(): CmsConfig {
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
