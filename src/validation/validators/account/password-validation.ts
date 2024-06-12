import { type PasswordValidator } from '@/validation/protocols'
import { ValidationError } from '@/validation/errors'
import { type Validation } from '@/presentation/protocols'

export class PasswordValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly passwordValidator: PasswordValidator
  ) {}

  public validate(input: object): void {
    const password: string = input[this.fieldName]
    if (!this.passwordValidator.isValid(password)) {
      throw new ValidationError(`${this.fieldName} must be a strong password`)
    }
  }
}
