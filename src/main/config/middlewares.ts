import { type Express } from 'express'

import { cors } from '@/main/middlewares'

export const setupMiddlewares = (app: Express): void => {
  app.use(cors)
}
