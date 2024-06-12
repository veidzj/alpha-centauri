import { type Controller, type Validation, type HttpResponse } from '@/presentation/protocols'
import { created, badRequest, serverError, conflict } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'
import { type AddAccount } from '@/domain/usecases/account'
import { AccountAlreadyExistsError } from '@/domain/errors/account'

export class SignUpController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addAccount: AddAccount
  ) {}

  public async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      const accountId = await this.addAccount.add(request)
      return created({ accountId })
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error)
      }
      if (error instanceof AccountAlreadyExistsError) {
        return conflict(error)
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
