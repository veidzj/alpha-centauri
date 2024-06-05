import { faker } from '@faker-js/faker'

import { type AddAccount } from '@/domain/usecases/account'

export class AddAccountSpy implements AddAccount {
  public input: AddAccount.Input
  public output: string = faker.database.mongodbObjectId()

  public async add(input: AddAccount.Input): Promise<string> {
    this.input = input
    return this.output
  }
}

export const mockAddAccountInput = (): AddAccount.Input => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  birthdate: faker.date.birthdate().toString(),
  profileImage: faker.internet.url()
})
