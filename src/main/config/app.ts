import express, { type Express } from 'express'

import { setupSwagger } from '@/main/config/swagger'
import { setupMiddlewares } from '@/main/config/middlewares'
import setupRoutes from '@/main/config/routes'

export const setupApp = async(): Promise<Express> => {
  const app = express()
  setupSwagger(app)
  setupMiddlewares(app)
  await setupRoutes(app)
  return app
}
