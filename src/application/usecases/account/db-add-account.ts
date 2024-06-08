import { type CheckAccountByEmailRepository } from '@/application/protocols/account'
import { type AddAccount } from '@/domain/usecases/account'

export class DbAddAccount implements AddAccount {
  constructor(private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository) {}

  public async add(input: AddAccount.Input): Promise<string> {
    await this.checkAccountByEmailRepository.check(input.email)
    return ''
  }
}
