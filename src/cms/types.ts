export type CmsConfig = {
  allowedOrigins: string[]
  cookieDomain?: string
  dataDir: string
  passwordHash: string
  publicApiUrl?: string
  secureCookies: boolean
  sessionSecret: string
  username: string
}

export type InventoryItemRow = {
  created_at: number
  description: string
  id: string
  image_filename: string
  position: number
  title: string
  updated_at: number
}

export type Upload = { buffer: Buffer; mimetype: string } | undefined
