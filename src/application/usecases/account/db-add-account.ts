import { type CheckAccountByEmailRepository, type AddAccountRepository } from '@/application/protocols/account'
import { type Hasher } from '@/application/protocols/security'
import { type AddAccount } from '@/domain/usecases/account'
import { AccountAlreadyExistsError } from '@/domain/errors/account'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  public async add(input: AddAccount.Input): Promise<string> {
    const accountAlreadyExists = await this.checkAccountByEmailRepository.check(input.email)
    if (accountAlreadyExists) {
      throw new AccountAlreadyExistsError()
    }
    const hashedPassword = await this.hasher.hash(input.password)
    const accountId = await this.addAccountRepository.add({
      ...input,
      password: hashedPassword,
      isActive: true,
      roles: ['user'],
      createdAt: new Date()
    })
    return accountId
  }
}
