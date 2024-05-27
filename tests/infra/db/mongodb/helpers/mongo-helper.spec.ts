import { MongoClient } from 'mongodb'

import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

jest.mock('mongodb', () => ({
  MongoClient: {
    connect: jest.fn(),
    prototype: {
      db: jest.fn().mockReturnThis(),
      collection: jest.fn(),
      close: jest.fn()
    }
  }
}))

describe('MongoHelper', () => {
  let mongoHelper: MongoHelper

  beforeEach(() => {
    mongoHelper = MongoHelper.getInstance()
  })

  afterEach(() => {
    jest.clearAllMocks()
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
      await mongoHelper.connect('mongodb://localhost:27017')
      expect(MongoClient.connect).toHaveBeenCalledWith('mongodb://localhost:27017')
    })
  })
})
