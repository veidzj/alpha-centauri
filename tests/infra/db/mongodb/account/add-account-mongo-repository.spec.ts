import { type Collection, ObjectId } from 'mongodb'

import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb/mongo-test-setup'
import { mockAddAccountRepositoryInput } from '@/tests/application/mocks/account'
import { AddAccountMongoRepository } from '@/infra/db/mongodb/account'
import { MongoHelper } from '@/infra/db/mongodb/helpers'

let accountCollection: Collection

const makeSut = (): AddAccountMongoRepository => {
  return new AddAccountMongoRepository()
}

describe('AddAccountMongoRepository', () => {
  beforeAll(async() => {
    await connectToDatabase()
  })

  afterAll(async() => {
    await disconnectFromDatabase()
  })

  beforeEach(async() => {
    accountCollection = await getCollection('accounts')
    await clearCollection(accountCollection)
  })

  test('Should add an account on success', async() => {
    const sut = makeSut()
    const addAccountRepositoryInput = mockAddAccountRepositoryInput()
    const insertedId = await sut.add(addAccountRepositoryInput)
    const count = await accountCollection.countDocuments()
    const account = await accountCollection.findOne({ _id: new ObjectId(insertedId) })
    expect(count).toBe(1)
    expect(account).toEqual(addAccountRepositoryInput)
  })

  test('Should throw if getCollection throws', async() => {
    const sut = makeSut()
    jest.spyOn(MongoHelper.getInstance(), 'getCollection').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.add(mockAddAccountRepositoryInput())
    await expect(promise).rejects.toThrow()
  })
})