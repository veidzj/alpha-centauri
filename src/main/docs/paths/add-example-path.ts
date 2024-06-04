export const addExamplePath = {
  post: {
    tags: ['Example'],
    summary: 'Adds a new example',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addExampleRequest'
          }
        }
      }
    },
    responses: {
      201: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/addExampleResponse'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
