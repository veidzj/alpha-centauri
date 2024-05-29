import { type Controller, type Validation, type HttpResponse } from '@/presentation/protocols'
import { created, serverError } from '@/presentation/helpers'
import { type AddExample } from '@/domain/usecases/example'

export class AddExampleController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addExample: AddExample
  ) {}

  public async handle(request: AddExampleController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      const exampleId = await this.addExample.add(request)
      return created({ exampleId })
    } catch (error) {
      return serverError()
    }
  }
}

export namespace AddExampleController {
  export interface Request {
    name: string
  }
}
