import { faker } from '@faker-js/faker'

import { PasswordValidatorSpy } from '@/tests/validation/mocks'
import { PasswordValidation } from '@/validation/validators/account'

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
})
