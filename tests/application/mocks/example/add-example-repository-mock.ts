import { faker } from '@faker-js/faker'

import { type AddExampleRepository } from '@/application/protocols/example/add-example-repository'

export class AddExampleRepositorySpy implements AddExampleRepository {
  public input: AddExampleRepository.Input
  public output: string = faker.database.mongodbObjectId()

  public async add(input: AddExampleRepository.Input): Promise<string> {
    this.input = input
    return this.output
  }
}

export const mockAddExampleRepositoryInput = (): AddExampleRepository.Input => ({
  name: faker.person.fullName()
})
