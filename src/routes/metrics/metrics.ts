import { knex } from '../../database/setup.ts'

import type { FastifyInstance, RouteOptions } from 'fastify'

import { checkSessionId } from '../../middlewares/check-session-id.ts'

const ROUTE_OPTIONS: Partial<RouteOptions> = {
  preHandler: [checkSessionId],
}

export const metrics = async (app: FastifyInstance) => {
  app.get('/meals', ROUTE_OPTIONS, async ({ user }, reply) => {
    if (!user) {
      return reply
        .status(401)
        .send({ message: 'Unauthorized' })
    }

    const totalMeals = await knex('meals')
      .where({ user_id: user.id })
      .orderBy('timestamp', 'desc')

    const totalMealsInDiet = totalMeals.filter(meal => meal.is_on_diet).length
    const totalMealsOffDiet = totalMeals.filter(meal => !meal.is_on_diet).length

    let bestSequenceInDiet = 0
    let currentSequence = 0

    for (const meal of totalMeals) {
      if (meal.is_on_diet) {
        currentSequence++
        bestSequenceInDiet = Math.max(bestSequenceInDiet, currentSequence)
      } else {
        currentSequence = 0
      }
    }

    const metrics = {
      totalMeals: totalMeals.length,
      totalMealsInDiet,
      totalMealsOffDiet,
      bestSequenceInDiet
    }

    return reply
      .status(201)
      .send({ metrics })
  })
}
