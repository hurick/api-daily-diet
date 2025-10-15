import type { Route } from '../@types/routes.ts'

import { meals } from './meals/meals.ts'
import { users } from './users/users.ts'

export const routes: Route[] = [
  { paths: users, options: { prefix: '/users' } },
  { paths: meals, options: { prefix: '/meals' } },
]
