import { type Request, type Response } from 'express'

import { type Controller } from '@/presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async(req: Request, res: Response) => {
    const request: object = {
      ...(req.body || {}),
      ...(req.params || {})
    }
    const httpResponse = await controller.handle(request)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
