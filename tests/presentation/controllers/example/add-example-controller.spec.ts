import { faker } from '@faker-js/faker'

import { AddExampleSpy } from '@/tests/domain/mocks/example'
import { AddExampleController } from '@/presentation/controllers/example'
import { created, serverError } from '@/presentation/helpers'

interface Sut {
  sut: AddExampleController
  addExampleSpy: AddExampleSpy
}

const makeSut = (): Sut => {
  const addExampleSpy = new AddExampleSpy()
  const sut = new AddExampleController(addExampleSpy)
  return {
    sut,
    addExampleSpy
  }
}

const mockRequest = (): AddExampleController.Request => ({
  name: faker.person.fullName()
})

describe('AddExampleController', () => {
  test('Should call AddExample with correct values', async() => {
    const { sut, addExampleSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addExampleSpy.input).toEqual(request)
  })

  test('Should return status 201 with example id', async() => {
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
