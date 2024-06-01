import express, { type Express } from 'express'

import setupRoutes from '@/main/config/routes'
import { setupMiddlewares } from './middlewares'

export const setupApp = async(): Promise<Express> => {
  const app = express()
  setupMiddlewares(app)
  await setupRoutes(app)
  return app
}
