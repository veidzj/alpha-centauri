import { type AddExampleRepository } from '@/application/protocols/example/add-example-repository'
import { type AddExample } from '@/domain/usecases/example'

export class DbAddExample implements AddExample {
  constructor(private readonly addExampleRepository: AddExampleRepository) {}

  public async add(input: AddExample.Input): Promise<string> {
    const exampleId = await this.addExampleRepository.add(input)
    return exampleId
  }
}
