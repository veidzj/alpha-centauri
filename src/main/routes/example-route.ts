import { type Router } from 'express'

import { adaptRoute } from '@/main/adapters'
import { makeAddExampleController } from '@/main/factories/controllers/example'

export default (router: Router): void => {
  router.post('/v1/example', adaptRoute(makeAddExampleController()))
}
