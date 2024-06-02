import { type Express } from 'express'
import request from 'supertest'
import { faker } from '@faker-js/faker'

import { setupApp } from '@/main/config'

describe('BodyParser Middleware', () => {
  let app: Express
  const route: string = `/${faker.internet.url()}`
  const data = {
    name: faker.person.fullName()
  }

  beforeAll(async() => {
    app = await setupApp()
  })

  test('Should parse body as json', async() => {
    app.post(route, (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post(route)
      .send(data)
      .expect(data)
  })
})
