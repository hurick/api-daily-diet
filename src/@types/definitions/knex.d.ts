import 'knex'

import type { User } from '../users.ts'
import type { Meal } from '../meals.ts'

declare module 'knex/types/tables.js' {
  export interface Tables {
    users: User
    meals: Meal
  }
}
