import { faker } from '@faker-js/faker'

import { type AddExample } from '@/domain/usecases/example'

export class AddExampleSpy implements AddExample {
  public input: AddExample.Input
  public output: string = faker.database.mongodbObjectId()

  public async add(input: AddExample.Input): Promise<string> {
    this.input = input
    return this.output
  }
}

export const mockAddExampleInput = (): AddExample.Input => ({
  name: faker.person.fullName()
})
