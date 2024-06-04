import { badRequestSchema } from './bad-request-schema'
import { serverErrorSchema } from './server-error-schema'

export const httpErrorsSchema = {
  badRequest: badRequestSchema,
  serverError: serverErrorSchema
}
