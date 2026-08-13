import type { FastifyInstance } from 'fastify'
import { createCmsHandlers } from './handlers'

type CmsHandlers = ReturnType<typeof createCmsHandlers>

export function registerCmsRoutes(app: FastifyInstance, handlers: CmsHandlers) {
  app.get('/health', handlers.health)
  app.get('/v1/inventory', handlers.getPublicInventory)
  app.get('/media/:filename', handlers.getMedia)
  app.post(
    '/v1/auth/login',
    {
      preHandler: handlers.requireAllowedOrigin,
      config: { rateLimit: { max: 5, timeWindow: '15 minutes' } },
    },
    handlers.login,
  )
  app.post(
    '/v1/auth/logout',
    { preHandler: [handlers.authenticate, handlers.requireAllowedOrigin] },
    handlers.logout,
  )
  app.get(
    '/v1/admin/inventory',
    { preHandler: handlers.authenticate },
    handlers.getAdminInventory,
  )
  app.post(
    '/v1/admin/inventory',
    { preHandler: [handlers.authenticate, handlers.requireAllowedOrigin] },
    handlers.createInventoryItem,
  )
  app.patch(
    '/v1/admin/inventory/:id',
    { preHandler: [handlers.authenticate, handlers.requireAllowedOrigin] },
    handlers.updateInventoryItem,
  )
  app.post(
    '/v1/admin/inventory/order',
    { preHandler: [handlers.authenticate, handlers.requireAllowedOrigin] },
    handlers.reorderInventory,
  )
  app.delete(
    '/v1/admin/inventory/:id',
    { preHandler: [handlers.authenticate, handlers.requireAllowedOrigin] },
    handlers.deleteInventoryItem,
  )
}
