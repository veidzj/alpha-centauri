import { Collection } from 'mongodb'

import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

describe('MongoHelper', () => {
  let mongoHelper: MongoHelper

  beforeEach(() => {
    mongoHelper = MongoHelper.getInstance()
  })

  afterEach(async() => {
    await mongoHelper.disconnect()
  })

  it('Should return a singleton instance', () => {
    const instance1 = MongoHelper.getInstance()
    const instance2 = MongoHelper.getInstance()
    expect(instance1).toBe(instance2)
  })

  it('Should connect to the database', async() => {
    await mongoHelper.connect(process.env.MONGO_URL ?? '')
    expect(mongoHelper.getClient()).toBeTruthy()
  })

  it('Should disconnect from the database', async() => {
    await mongoHelper.connect(process.env.MONGO_URL ?? '')
    await mongoHelper.disconnect()
    expect(mongoHelper.getClient()).toBeNull()
  })

  it('Should not fail if disconnect is called when client is null', async() => {
    const mongoHelper = MongoHelper.getInstance()
    await mongoHelper.disconnect()
    expect(mongoHelper.getClient()).toBeNull()
  })

  it('Should reconnect to the database after disconnect', async() => {
    const mongoHelper = MongoHelper.getInstance()
    await mongoHelper.connect(process.env.MONGO_URL ?? '')
    await mongoHelper.disconnect()
    await mongoHelper.connect(process.env.MONGO_URL ?? '')
    expect(mongoHelper.getClient()).toBeTruthy()
  })

  it('Should get a collection when connected', async() => {
    const mongoHelper = MongoHelper.getInstance()
    await mongoHelper.connect(process.env.MONGO_URL ?? '')
    const collection = mongoHelper.getCollection('test-collection')
    expect(collection).toBeInstanceOf(Collection)
  })

  it('Should throw when trying to get a collection without an active connection', () => {
    const mongoHelper = MongoHelper.getInstance()
    expect(() => {
      mongoHelper.getCollection('test-collection')
    }).toThrow('No active connection to the database')
  })
})
