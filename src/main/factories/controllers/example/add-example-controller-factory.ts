import { makeAddExampleValidation } from '@/main/factories/validators/example'
import { makeAddExample } from '@/main/factories/usecases/example'
import { type Controller } from '@/presentation/protocols'
import { AddExampleController } from '@/presentation/controllers/example'

export const makeAddExampleController = (): Controller => {
  const controller = new AddExampleController(makeAddExampleValidation(), makeAddExample())
  return controller
}
