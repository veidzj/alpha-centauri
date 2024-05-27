import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

describe('MongoHelper', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
})
