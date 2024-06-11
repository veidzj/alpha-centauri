import { faker } from '@faker-js/faker'

import { EmailValidatorSpy } from '@/tests/validation/mocks'
import { EmailValidation } from '@/validation/validators/account'
import { ValidationError } from '@/validation/errors'

interface Sut {
  sut: EmailValidation
  emailValidatorSpy: EmailValidatorSpy
}

const makeSut = (): Sut => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation(fieldName, emailValidatorSpy)
  return {
    sut,
    emailValidatorSpy
  }
}

const fieldName: string = faker.word.words()

describe('EmailValidation', () => {
  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut()
    const email = faker.internet.email()
    sut.validate({ [fieldName]: email })
    expect(emailValidatorSpy.email).toBe(email)
  })

  test('Should throw ValidationError if EmailValidator returns false', () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isEmailValid = false
    expect(() => {
      sut.validate({ [fieldName]: faker.internet.email() })
    }).toThrow(new ValidationError(`${fieldName} must be a valid email`))
  })
})
