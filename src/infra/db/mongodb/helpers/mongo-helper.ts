import { MongoClient, type Collection, type ObjectId } from 'mongodb'

interface DocumentWithId {
  _id: ObjectId
}

export class MongoHelper {
  private static instance: MongoHelper
  private client: MongoClient | null = null

  public static getInstance(): MongoHelper {
    if (!MongoHelper.instance) {
      MongoHelper.instance = new MongoHelper()
    }

    return MongoHelper.instance
  }

  public getClient(): MongoClient | null {
    return this.client
  }

  public async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  }

  public async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close()
      this.client = null
    }
  }

  public getCollection(name: string): Collection {
    if (!this.client) {
      throw new Error('No active connection to the database')
    }
    return this.client.db().collection(name)
  }

  public mapId<T extends DocumentWithId>(mongoDoc: T): string {
    return mongoDoc._id.toString()
  }
}
