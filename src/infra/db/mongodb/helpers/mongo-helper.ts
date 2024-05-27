import { MongoClient } from 'mongodb'

export class MongoHelper {
  private static instance: MongoHelper
  private client: MongoClient | null = null

  public static getInstance(): MongoHelper {
    if (!MongoHelper.instance) {
      MongoHelper.instance = new MongoHelper()
    }

    return MongoHelper.instance
  }

  public async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  }
}
