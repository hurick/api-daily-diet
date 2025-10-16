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

  it('should be able to create a new meal', async () => {})
})
