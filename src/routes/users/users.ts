import { randomUUID } from 'node:crypto'
import { knex } from '../../database/setup.ts'

import type { FastifyInstance } from 'fastify'
import type { CookieSerializeOptions } from '@fastify/cookie'

import { createUserBodySchema } from './schema.ts'

const COOKIES_OPTIONS: CookieSerializeOptions = {
  path: '/',
  maxAge: 60 * 60 * 24 * 7
}

export const users = async (app: FastifyInstance) => {
  app.get('/', async (request, reply) => {
    const users = await knex('users')
      .select('*')

    return reply
      .status(200)
      .send({ users })
  })

  app.post('/', async ({ body, cookies }, reply) => {
    const { success, error, data } = createUserBodySchema.safeParse(body)

    if (!success) {
      return reply
        .status(400)
        .send({
          message: 'Invalid request body',
          issues: error.issues.map(({ path, message }) => ({
            path: path.join('.'),
            message
          }))
        })
    }

    let session_id = cookies.sessionId

    if (!session_id) {
      session_id = randomUUID()

      reply.setCookie('sessionId', session_id, COOKIES_OPTIONS)
    }

    const { name, email } = data

    const userEmailAlreadyExists = await knex('users')
      .where({ email })
      .first()

    if (userEmailAlreadyExists) {
      return reply
        .status(409)
        .send({
          message: 'Email already exists'
        })
    }

    await knex('users')
      .insert({
        id: randomUUID(),
        name,
        email,
        session_id
      })

    return reply
      .status(201)
      .send({
        message: 'User created successfully'
      })
  })
}
