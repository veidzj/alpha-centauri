import { faker } from '@faker-js/faker'

import { PasswordValidatorSpy } from '@/tests/validation/mocks'
import { PasswordValidation } from '@/validation/validators/account'
import { ValidationError } from '@/validation/errors'

interface Sut {
  sut: PasswordValidation
  passwordValidatorSpy: PasswordValidatorSpy
}

const makeSut = (): Sut => {
  const passwordValidatorSpy = new PasswordValidatorSpy()
  const sut = new PasswordValidation(fieldName, passwordValidatorSpy)
  return {
    sut,
    passwordValidatorSpy
  }
}

const fieldName: string = faker.word.words()

describe('PasswordValidation', () => {
  test('Should call PasswordValidator with correct password', () => {
    const { sut, passwordValidatorSpy } = makeSut()
    const password = faker.internet.password()
    sut.validate({ [fieldName]: password })
    expect(passwordValidatorSpy.password).toBe(password)
  })

  test('Should throw ValidationError if PasswordValidator returns false', () => {
    const { sut, passwordValidatorSpy } = makeSut()
    passwordValidatorSpy.isPasswordStrong = false
    expect(() => {
      sut.validate({ [fieldName]: faker.internet.password() })
    }).toThrow(new ValidationError(`${fieldName} must be a strong password`))
  })

  test('Should throw if PasswordValidator throws', () => {
    const { sut, passwordValidatorSpy } = makeSut()
    jest.spyOn(passwordValidatorSpy, 'isValid').mockImplementationOnce(() => { throw new Error() })
    expect(() => {
      sut.validate({ [fieldName]: faker.internet.password() })
    }).toThrow()
  })
})
