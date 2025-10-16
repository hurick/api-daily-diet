import { z } from 'zod'

export const createMealBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  timestamp: z.coerce.date(),
  is_on_diet: z.boolean(),
})

export const updateMealBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  timestamp: z.coerce.date(),
  is_on_diet: z.boolean(),
})

export const mealParamsSchema = z.object({
  id: z.uuid(),
})
