import { AddExampleRepositorySpy } from '@/tests/application/mocks/example'
import { mockAddExampleInput } from '@/tests/domain/mocks/example'
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
    const addExampleInput = mockAddExampleInput()
    await sut.add(addExampleInput)
    expect(addExampleRepositorySpy.input).toEqual(addExampleInput)
  })

  test('Should return example id on success', async() => {
    const { sut, addExampleRepositorySpy } = makeSut()
    const exampleId = await sut.add(mockAddExampleInput())
    expect(exampleId).toBe(addExampleRepositorySpy.output)
  })

  test('Should throw if AddExampleRepository throws', async() => {
    const { sut, addExampleRepositorySpy } = makeSut()
    jest.spyOn(addExampleRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddExampleInput())
    await expect(promise).rejects.toThrow()
  })
})
