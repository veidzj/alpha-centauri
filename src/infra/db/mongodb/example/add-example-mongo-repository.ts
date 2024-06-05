import { MongoRepository } from '@/infra/db/mongodb/common'
import { type AddExampleRepository } from '@/application/protocols/example'

export class AddExampleMongoRepository extends MongoRepository implements AddExampleRepository {
  public async add(input: AddExampleRepository.Input): Promise<string> {
    const exampleCollection = this.mongoHelper.getCollection('examples')
    const query = await exampleCollection.insertOne(input)
    return query.insertedId.toHexString()
  }
}
