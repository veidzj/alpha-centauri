import { faker } from '@faker-js/faker'

import { ValidationSpy } from '@/tests/presentation/mocks'
import { SignUpController } from '@/presentation/controllers/account'
import { badRequest, serverError } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'

interface Sut {
  sut: SignUpController
  validationSpy: ValidationSpy
}

const makeSut = (): Sut => {
  const validationSpy = new ValidationSpy()
  const sut = new SignUpController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

const mockRequest = (): SignUpController.Request => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  birthdate: faker.date.birthdate().toString(),
  profileImage: faker.internet.url()
})

describe('SignUpController', () => {
  describe('Validation', () => {
    test('Should call Validation with correct values', async() => {
      const { sut, validationSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(validationSpy.input).toEqual(request)
    })

    test('Should return status 400 if Validation throws ValidationError', async() => {
      const { sut, validationSpy } = makeSut()
      const errorMessage = faker.word.words()
      jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => { throw new ValidationError(errorMessage) })
      const response = await sut.handle(mockRequest())
      expect(response).toEqual(badRequest(new ValidationError(errorMessage)))
    })

    test('Should return status 500 if Validation throws', async() => {
      const { sut, validationSpy } = makeSut()
      jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => { throw new Error() })
      const response = await sut.handle(mockRequest())
      expect(response).toEqual(serverError())
    })
  })
})
