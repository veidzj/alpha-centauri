import { type Express } from 'express'
import request from 'supertest'
import { faker } from '@faker-js/faker'

import { setupApp } from '@/main/config'

describe('ContentType Middleware', () => {
  let app: Express
  const route: string = `/${faker.internet.url()}`

  beforeAll(async() => {
    app = await setupApp()
  })

  test('Should return default content type as json', async() => {
    app.get(route, (req, res) => {
      res.send()
    })

    await request(app)
      .get(route)
      .expect('content-type', /json/)
  })
})
