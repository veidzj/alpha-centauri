import { faker } from '@faker-js/faker'

import { AddExampleSpy } from '@/tests/domain/mocks/example'
import { AddExampleController } from '@/presentation/controllers/example'

const mockRequest = (): AddExampleController.Request => ({
  name: faker.person.fullName()
})

describe('AddExampleController', () => {
  test('Should call AddExample with correct values', async() => {
    const addExampleSpy = new AddExampleSpy()
    const sut = new AddExampleController(addExampleSpy)
    const request = mockRequest()
    await sut.handle(request)
    expect(addExampleSpy.input).toEqual(request)
  })
})
