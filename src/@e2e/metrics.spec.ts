import { execSync } from 'node:child_process'

import { app } from '../app.ts'

import { beforeAll, beforeEach, afterAll, describe, it } from 'vitest'

describe('Metrics', () => {
  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list user metrics for meals', async () => {})
})
