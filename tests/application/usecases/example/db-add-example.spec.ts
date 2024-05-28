import { AddExampleRepositorySpy } from '@/tests/application/mocks/example'
import { addExampleInput } from '@/tests/domain/mocks/example'
import { DbAddExample } from '@/application/usecases/example'

interface Sut {
  sut: DbAddExample
  addExampleRepositorySpy: AddExampleRepositorySpy
}

const makeSut = (): Sut => {
  const addExampleRepositorySpy = new AddExampleRepositorySpy()
  const sut = new DbAddExample(addExampleRepositorySpy)
  return {
    sut,
    addExampleRepositorySpy
  }
}

describe('DbAddExample', () => {
  test('Should call AddExampleRepository with correct values', async() => {
    const { sut, addExampleRepositorySpy } = makeSut()
    const exampleInput = addExampleInput()
    await sut.add(exampleInput)
    expect(addExampleRepositorySpy.input).toEqual(exampleInput)
  })
})
