export const badRequestSchema = {
  type: 'object',
  properties: {
    error: {
      type: 'string'
    }
  },
  required: ['error']
}
