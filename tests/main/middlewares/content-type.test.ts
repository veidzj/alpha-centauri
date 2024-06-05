import { type Express } from 'express'
import request from 'supertest'
import { faker } from '@faker-js/faker'

import { setupApp } from '@/main/config'

describe('ContentType Middleware', () => {
  let app: Express
  let route: string = `/${faker.internet.url()}`

  beforeAll(async() => {
    app = await setupApp()
  })

  beforeEach(() => {
    route = `/${faker.internet.url()}`
  })

  test('Should return default content type as json', async() => {
    app.get(route, (req, res) => {
      res.send()
    })

    await request(app)
      .get(route)
      .expect('content-type', /json/)
  })

  test('Should return xml content type when forced', async() => {
    app.get(route, (req, res) => {
      res.type('xml')
      res.send()
    })

    await request(app)
      .get(route)
      .expect('content-type', /xml/)
  })
})
