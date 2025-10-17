import { execSync } from 'node:child_process'

import request from 'supertest'

import { app } from '../app.ts'

import { beforeAll, beforeEach, afterAll, describe, it, expect } from 'vitest'

const user = {
  name: 'Another John',
  email: 'another.john@example.com'
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

describe('Meals', () => {
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

  it('should be able to list all meals', async () => {
    const createUserResponse = await request(app.server)
      .get('/users')
      .expect(200)

    expect(createUserResponse.body).toEqual(expect.objectContaining({ users: expect.any(Array) }))
  })

  it('should be able to create a new meal', async () => {
    const createUserResponse = await request(app.server)
      .post('/users')
      .send({
        name: user.name,
        email: user.email
      })
      .expect(201)

    const cookies = createUserResponse.headers['set-cookie']

    const response = await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send(meals[0])
      .expect(201)

    expect(response.body).toEqual(
      expect.objectContaining({ message: 'Meal created successfully' })
    )
  })

  it('should be able to list single meal', async () => {
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

    const listAllMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)
      .expect(200)

    const mealId = listAllMealsResponse.body.meals[0].id

    const { body } = await request(app.server)
      .get(`/meals/${mealId}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(body).toEqual(expect.objectContaining({
      meal: expect.objectContaining({ id: mealId })
    }))
  })

  it('should be able to edit single meal', async () => {
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

    const listAllMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)
      .expect(200)

    const mealId = listAllMealsResponse.body.meals[0].id

    const response = await request(app.server)
      .put(`/meals/${mealId}`)
      .set('Cookie', cookies)
      .send({
        name: 'Updated Meal',
        description: 'Updated description',
        timestamp: new Date(),
        is_on_diet: false
      })
      .expect(200)

    expect(response.body).toEqual(
      expect.objectContaining({ message: 'Meal updated successfully' })
    )
  })

  it('should be able to delete single meal', async () => {
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

    const listAllMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)
      .expect(200)

    const mealId = listAllMealsResponse.body.meals[0].id

    const response = await request(app.server)
      .delete(`/meals/${mealId}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(response.body).toEqual(
      expect.objectContaining({ message: 'Meal deleted successfully' })
    )
  })
})
