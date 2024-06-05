import { httpErrorsSchema } from '@/main/docs/schemas/http-errors'
import { healthCheckSchema } from '@/main/docs/schemas/health'
import { exampleSchema } from '@/main/docs/schemas/example'

export default {
  ...httpErrorsSchema,
  ...healthCheckSchema,
  ...exampleSchema
}
