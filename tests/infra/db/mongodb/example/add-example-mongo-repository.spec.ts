import { Collection, ObjectId } from 'mongodb'

import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb/mongo-test-setup'
import { AddExampleMongoRepository } from '@/infra/db/mongodb/example'
import { mockAddExampleRepositoryInput } from '@/tests/application/mocks/example'

let exampleCollection: Collection

const makeSut = (): AddExampleMongoRepository => {
  return new AddExampleMongoRepository()
}

describe('AddExampleMongoRepository', () => {
  beforeAll(async() => {
    await connectToDatabase()
  })

  afterAll(async() => {
    await disconnectFromDatabase()
  })

  beforeEach(async() => {
    exampleCollection = await getCollection('examples')
    await clearCollection(exampleCollection)
  })

  test('Should add an exammple on success', async() => {
    const sut = makeSut()
    const addExampleRepositoryInput = mockAddExampleRepositoryInput()
    const insertedId = await sut.add(addExampleRepositoryInput)
    const count = await exampleCollection.countDocuments()
    const account = await exampleCollection.findOne({ _id: new ObjectId(insertedId) })
    expect(count).toBe(1)
    expect(account).toEqual(addExampleRepositoryInput)
  })

  test('Should throw if mongo throws', async() => {
    const sut = makeSut()
    jest.spyOn(Collection.prototype, 'insertOne').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddExampleRepositoryInput())
    await expect(promise).rejects.toThrow()
  })
})
