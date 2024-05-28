import { addExampleInput } from '@/tests/domain/mocks/example'
import { type AddExampleRepository } from '@/application/protocols/example/add-example-repository'
import { DbAddExample } from '@/application/usecases/example'

describe('DbAddExample', () => {
  test('Should call AddExampleRepository with correct values', async() => {
    class AddExampleRepositorySpy implements AddExampleRepository {
      public input: AddExampleRepository.Input
      public output: string

      public async add(input: AddExampleRepository.Input): Promise<string> {
        this.input = input
        return this.output
      }
    }
    const addExampleRepositorySpy = new AddExampleRepositorySpy()
    const sut = new DbAddExample(addExampleRepositorySpy)
    const exampleInput = addExampleInput()
    await sut.add(exampleInput)
    expect(addExampleRepositorySpy.input).toEqual(exampleInput)
  })
})
