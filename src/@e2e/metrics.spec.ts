import { execSync } from 'node:child_process'

import request from 'supertest'

import { app } from '../app.ts'

import { beforeAll, beforeEach, afterAll, describe, it, expect } from 'vitest'

const user = {
  name: 'Yet Another John',
  email: 'yet.another.john@example.com'
}

const meals = [
  {
    name: 'Meal 1',
    description: 'Delicious meal',
    timestamp: new Date(),
    is_on_diet: true
  },
  {
    name: 'Meal 2',
    description: 'Delicious meal 2',
    timestamp: new Date(Date.now() + 24 * 60 * 60 * 1000),
    is_on_diet: true
  },
  {
    name: 'Meal 3',
    description: 'Delicious meal 3',
    timestamp: new Date(Date.now() + 48 * 60 * 60 * 1000),
    is_on_diet: false
  },
]

describe('Metrics', () => {
  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(() => {
    execSync('npm run knex -- migrate:rollback --all')
    execSync('npm run knex -- migrate:latest')
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list user metrics for meals', async () => {
    const createUserResponse = await request(app.server)
      .post('/users')
      .send({
        name: user.name,
        email: user.email
      })
      .expect(201)

    const cookies = createUserResponse.headers['set-cookie']

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send(meals[0])
      .expect(201)

    const { body } = await request(app.server)
      .get('/metrics/meals')
      .set('Cookie', cookies)
      .expect(201)

    expect(body).toEqual(expect.objectContaining({
      metrics: expect.objectContaining({
        totalMeals: 1,
        totalMealsInDiet: 1,
        totalMealsOffDiet: 0,
        bestSequenceInDiet: 1
      })
    }))
  })
})
