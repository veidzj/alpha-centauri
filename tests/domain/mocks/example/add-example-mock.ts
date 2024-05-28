import { faker } from '@faker-js/faker'

import { type AddExample } from '@/domain/usecases/example'

export const addExampleInput = (): AddExample.Input => ({
  name: faker.person.fullName()
})
