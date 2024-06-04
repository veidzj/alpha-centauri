import { httpErrorsSchema } from '@/main/docs/schemas/http-errors'
import { exampleSchema } from '@/main/docs/schemas/example'

export default {
  ...httpErrorsSchema,
  ...exampleSchema
}
