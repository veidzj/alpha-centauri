import { type Controller, type Validation, type HttpResponse } from '@/presentation/protocols'
import { badRequest, serverError } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'

export class SignUpController implements Controller {
  constructor(
    private readonly validation: Validation
  ) {}

  public async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      return serverError()
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error)
      }
      return serverError()
    }
  }
}

export namespace SignUpController {
  export interface Request {
    username: string
    email: string
    password: string
    birthdate: string
    profileImage?: string
  }
}
