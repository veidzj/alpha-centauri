import express, { type Express } from 'express'

import setupRoutes from '@/main/config/routes'

export const setupApp = async(): Promise<Express> => {
  const app = express()
  await setupRoutes(app)
  return app
}
