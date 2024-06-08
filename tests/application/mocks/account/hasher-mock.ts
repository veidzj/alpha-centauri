import { faker } from '@faker-js/faker'

import { type Hasher } from '@/application/protocols/account'

export class HasherSpy implements Hasher {
  public plainText: string
  public digest: string = faker.string.uuid()

  public async hash(plainText: string): Promise<string> {
    this.plainText = plainText
    return this.digest
  }
}
