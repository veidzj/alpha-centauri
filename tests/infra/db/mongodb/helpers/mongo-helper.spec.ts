import { faker } from '@faker-js/faker'
import { Collection, ObjectId } from 'mongodb'

import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { env } from '@/main/config'

describe('MongoHelper', () => {
  let mongoHelper: MongoHelper

  beforeEach(() => {
    mongoHelper = MongoHelper.getInstance()
  })

  afterEach(async() => {
    await mongoHelper.disconnect()
  })

  test('Should return a singleton instance', () => {
    const instance1 = MongoHelper.getInstance()
    const instance2 = MongoHelper.getInstance()
    expect(instance1).toBe(instance2)
  })

  test('Should connect to the database', async() => {
    await mongoHelper.connect(env.mongoUrl)
    expect(mongoHelper.getClient()).toBeTruthy()
  })

  test('Should disconnect from the database', async() => {
    await mongoHelper.connect(env.mongoUrl)
    await mongoHelper.disconnect()
    expect(mongoHelper.getClient()).toBeNull()
  })

  test('Should not fail if disconnect is called when client is null', async() => {
    const mongoHelper = MongoHelper.getInstance()
    await mongoHelper.disconnect()
    expect(mongoHelper.getClient()).toBeNull()
  })

  test('Should reconnect to the database after disconnect', async() => {
    const mongoHelper = MongoHelper.getInstance()
    await mongoHelper.connect(env.mongoUrl)
    await mongoHelper.disconnect()
    await mongoHelper.connect(env.mongoUrl)
    expect(mongoHelper.getClient()).toBeTruthy()
  })

  test('Should get a collection when connected', async() => {
    const mongoHelper = MongoHelper.getInstance()
    await mongoHelper.connect(env.mongoUrl)
    const collection = mongoHelper.getCollection(faker.word.words())
    expect(collection).toBeInstanceOf(Collection)
  })

  test('Should throw when trying to get a collection without an active connection', () => {
    const mongoHelper = MongoHelper.getInstance()
    expect(() => {
      mongoHelper.getCollection(faker.word.words())
    }).toThrow('No active connection to the database')
  })

  test('Should map the document id to a string', () => {
    const mongoHelper = MongoHelper.getInstance()
    const mongoDoc = {
      _id: new ObjectId()
    }
    const idString = mongoHelper.mapId(mongoDoc)
    expect(idString).toBe(mongoDoc._id.toString())
  })

  test('Should map the document fields and add id property', () => {
    const mongoHelper = MongoHelper.getInstance()
    const mongoDoc = {
      _id: new ObjectId(),
      username: faker.internet.userName(),
      email: faker.internet.email()
    }
    const mappedDocument = mongoHelper.mapDocument(mongoDoc)
    expect(mappedDocument).toEqual({
      username: mongoDoc.username,
      email: mongoDoc.email,
      id: mongoDoc._id.toHexString()
    })
  })
})
