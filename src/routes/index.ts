import type { Route } from '../@types/routes.ts'

import { users } from './users/users.ts'
import { meals } from './meals/meals.ts'
import { metrics } from './metrics/metrics.ts'

export const routes: Route[] = [
  { paths: users, options: { prefix: '/users' } },
  { paths: meals, options: { prefix: '/meals' } },
  { paths: metrics, options: { prefix: '/metrics' } },
]
