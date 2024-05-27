import { type MongoClient } from 'mongodb'

export class MongoHelper {
  private static instance: MongoHelper
  private readonly client: MongoClient | null = null

  public static getInstance(): MongoHelper {
    if (!MongoHelper.instance) {
      MongoHelper.instance = new MongoHelper()
    }

    return MongoHelper.instance
  }
}
