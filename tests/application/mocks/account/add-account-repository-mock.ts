import { faker } from '@faker-js/faker'

import { type AddAccountRepository } from '@/application/protocols/account'

export class AddAccountRepositorySpy implements AddAccountRepository {
  public input: AddAccountRepository.Input
  public accountId: string = faker.database.mongodbObjectId()

  public async add(input: AddAccountRepository.Input): Promise<string> {
    this.input = input
    return this.accountId
  }
}
