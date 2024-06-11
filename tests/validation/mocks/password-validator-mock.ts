import { type PasswordValidator } from '@/validation/protocols'

export class PasswordValidatorSpy implements PasswordValidator {
  public password: string
  public isPasswordStrong: boolean = true

  public isValid(password: string): boolean {
    this.password = password
    return this.isPasswordStrong
  }
}
