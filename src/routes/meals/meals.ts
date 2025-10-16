import { randomUUID } from 'node:crypto'
import { knex } from '../../database/setup.ts'

import type { FastifyInstance, RouteOptions } from 'fastify'

import { createMealBodySchema, mealParamsSchema } from './schema.ts'

import { checkSessionId } from '../../middlewares/check-session-id.ts'

const ROUTE_OPTIONS: Partial<RouteOptions> = {
  preHandler: [checkSessionId],
}

export const meals = async (app: FastifyInstance) => {
  app.get('/', ROUTE_OPTIONS, async ({ user }, reply) => {
    if (!user) {
      return reply
        .status(401)
        .send({ message: 'Unauthorized' })
    }

    const meals = await knex('meals')
      .where('user_id', user.id)
      .orderBy('timestamp', 'desc')

    const parsedMeals = meals.map(meal => ({
      ...meal,
      is_on_diet: Boolean(meal.is_on_diet)
    }))

    return reply
      .status(200)
      .send({ meals: parsedMeals })
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

  app.put('/:id', ROUTE_OPTIONS, async ({ params, body, user }, reply) => {
    const { success: pSuccess, error: pError, data: pData } = mealParamsSchema.safeParse(params)
    const { success: bSuccess, error: bError, data: bData } = createMealBodySchema.safeParse(body)

    if (!user) {
      return reply
        .status(401)
        .send({ message: 'Unauthorized' })
    }

    if (!pSuccess) {
      return reply
        .status(400)
        .send({
          message: 'Invalid request params',
          issues: pError.issues.map(({ path, message }) => ({
            path: path.join('.'),
            message
          }))
        })
    }

    if (!bSuccess) {
      return reply
        .status(400)
        .send({
          message: 'Invalid request body',
          issues: bError.issues.map(({ path, message }) => ({
            path: path.join('.'),
            message
          }))
        })
    }

    const { id } = pData
    const { name, description, timestamp, is_on_diet } = bData

    const meal = await knex('meals')
      .where({ id })
      .first()

    if (!meal) {
      return reply
        .status(404)
        .send({ message: 'Meal not found' })
    }

    if (meal.user_id !== user.id) {
      return reply
        .status(403)
        .send({ message: 'You are not allowed to edit this meal' })
    }

    await knex('meals')
      .where({ id })
      .update({
        name,
        description,
        is_on_diet,
        timestamp: timestamp.getTime(),
        updated_at: knex.fn.now()
      })

    return reply
      .status(200)
      .send({ message: 'Meal updated successfully' })
  })

  app.delete('/:id', ROUTE_OPTIONS, async ({ params, user }, reply) => {
    const { success, error, data } = mealParamsSchema.safeParse(params)

    if (!user) {
      return reply
        .status(401)
        .send({ message: 'Unauthorized' })
    }

    if (!success) {
      return reply
        .status(400)
        .send({
          message: 'Invalid request params',
          issues: error.issues.map(({ path, message }) => ({
            path: path.join('.'),
            message
          }))
        })
    }

    const { id: paramId } = data
    const { id: userId } = user

    const meal = await knex('meals')
      .where({ id: paramId })
      .first()

    if (!meal) {
      return reply
        .status(404)
        .send({ message: 'Meal not found' })
    }

    if (meal.user_id !== userId) {
      return reply
        .status(403)
        .send({ message: 'You are not allowed to delete this meal' })
    }

    await knex('meals')
      .where({ id: paramId })
      .delete()

    return reply
      .status(200)
      .send({ message: 'Meal deleted successfully' })
  })
}
