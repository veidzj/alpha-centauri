export const healthCheckPath = {
  get: {
    tags: ['Health'],
    summary: 'Verify API health',
    responses: {
      200: {
        description: 'Successful health check'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
