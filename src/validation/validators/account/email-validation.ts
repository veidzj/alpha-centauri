import { type EmailValidator } from '@/validation/protocols'
import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class EmailValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  public validate(input: object): void {
    const email: string = input[this.fieldName]
    if (!this.emailValidator.isValid(email)) {
      throw new ValidationError(`${this.fieldName} must be a valid email`)
    }
  }
}
