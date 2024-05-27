import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

describe('MongoHelper', () => {
  let mongoHelper: MongoHelper

  beforeEach(() => {
    mongoHelper = MongoHelper.getInstance()
  })

  afterEach(async() => {
    await mongoHelper.disconnect()
  })

  describe('getInstance', () => {
    it('Should return a singleton instance', () => {
      const instance1 = MongoHelper.getInstance()
      const instance2 = MongoHelper.getInstance()
      expect(instance1).toBe(instance2)
    })
  })

  describe('connect', () => {
    it('Should connect to the database', async() => {
      await mongoHelper.connect(process.env.MONGO_URL ?? '')
      expect(mongoHelper.getClient()).toBeTruthy()
    })
  })
})
