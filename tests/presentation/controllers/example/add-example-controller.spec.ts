import { faker } from '@faker-js/faker'

import { AddExampleSpy } from '@/tests/domain/mocks/example'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { AddExampleController } from '@/presentation/controllers/example'
import { created, serverError } from '@/presentation/helpers'

interface Sut {
  sut: AddExampleController
  addExampleSpy: AddExampleSpy
  validationSpy: ValidationSpy
}

const makeSut = (): Sut => {
  const validationSpy = new ValidationSpy()
  const addExampleSpy = new AddExampleSpy()
  const sut = new AddExampleController(validationSpy, addExampleSpy)
  return {
    sut,
    validationSpy,
    addExampleSpy
  }
}

const mockRequest = (): AddExampleController.Request => ({
  name: faker.person.fullName()
})

describe('AddExampleController', () => {
  test('Should call Validation with correct values', async() => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should call AddExample with correct values', async() => {
    const { sut, addExampleSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addExampleSpy.input).toEqual(request)
  })

  test('Should return status 201 with example id on success', async() => {
    const { sut, addExampleSpy } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(created({ exampleId: addExampleSpy.output }))
  })

  test('Should return status 500 if AddExample throws', async() => {
    const { sut, addExampleSpy } = makeSut()
    jest.spyOn(addExampleSpy, 'add').mockRejectedValueOnce(new Error())
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError())
  })
})
