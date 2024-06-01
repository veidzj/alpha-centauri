import { type AddExample } from '@/domain/usecases/example'
import { DbAddExample } from '@/application/usecases/example'
import { AddExampleMongoRepository } from '@/infra/db/mongodb/example'

export const makeAddExample = (): AddExample => {
  const addExampleRepository = new AddExampleMongoRepository()
  return new DbAddExample(addExampleRepository)
}
