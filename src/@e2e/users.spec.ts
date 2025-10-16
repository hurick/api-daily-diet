import { execSync } from 'node:child_process'

import request from 'supertest'

import { app } from '../app.ts'

import { beforeAll, beforeEach, afterAll, describe, it, expect } from 'vitest'

describe('Users', () => {
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

  it('should be able to create a new user', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com'
      })
      .expect(201)

    expect(response.body).toEqual(
      expect.objectContaining({ message: 'User created successfully' })
    )
  })

  it('should be able to list all users', async () => {
    const response = await request(app.server)
      .get('/users')
      .expect(200)

    expect(response.body).toEqual(expect.objectContaining({ users: expect.any(Array) }))
  })
})
