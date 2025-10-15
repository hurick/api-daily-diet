import { randomUUID } from 'node:crypto'
import { knex } from '../../database/setup.ts'

import type { FastifyInstance, RouteOptions } from 'fastify'

import { createMealBodySchema } from './schema.ts'

import { checkSessionId } from '../../middlewares/check-session-id.ts'

const ROUTE_OPTIONS: Partial<RouteOptions> = {
  preHandler: [checkSessionId],
}

export const meals = async (app: FastifyInstance) => {
  app.get('/', ROUTE_OPTIONS, async ({ cookies, user }, reply) => {
    if (!user) {
      return reply
        .status(401)
        .send({ message: 'Unauthorized' })
    }

    const meals = await knex('meals')
      .where('user_id', user.id)
      .orderBy('timestamp', 'desc')

    return reply
      .status(200)
      .send({ meals })
  })

  app.post('/', ROUTE_OPTIONS, async ({ body, user }, reply) => {
    const { success, error, data } = createMealBodySchema.safeParse(body)

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

    if (!user) {
      return reply
        .status(401)
        .send({ message: 'Unauthorized' })
    }

    await knex('meals')
      .insert({
        ...data,
        id: randomUUID(),
        user_id: user.id,
        timestamp: data.timestamp.getTime()
      })

    return reply
      .status(201)
      .send({
        message: 'Meal created successfully'
      })
  })
}
