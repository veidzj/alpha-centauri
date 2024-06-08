import { type CheckAccountByEmailRepository, type Hasher } from '@/application/protocols/account'
import { type AddAccount } from '@/domain/usecases/account'
import { AccountAlreadyExistsError } from '@/domain/errors/account'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly hasher: Hasher
  ) {}

  public async add(input: AddAccount.Input): Promise<string> {
    const accountAlreadyExists = await this.checkAccountByEmailRepository.check(input.email)
    if (accountAlreadyExists) {
      throw new AccountAlreadyExistsError()
    }
    await this.hasher.hash(input.password)
    return ''
  }
}
