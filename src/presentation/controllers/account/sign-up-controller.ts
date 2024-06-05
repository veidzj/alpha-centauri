import { type Controller, type Validation, type HttpResponse } from '@/presentation/protocols'
import { serverError } from '@/presentation/helpers'

export class SignUpController implements Controller {
  constructor(
    private readonly validation: Validation
  ) {}

  public async handle(request: SignUpController.Request): Promise<HttpResponse> {
    this.validation.validate(request)
    return serverError()
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
