import { type Router } from 'express'

export default (router: Router): void => {
  router.get('/v1/health-check', (_, res) => {
    res.status(200).send()
  })
}
