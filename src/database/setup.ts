import setupKnex, { type Knex } from 'knex'

import { env } from '../utils/env.ts'

const connection = env.DATABASE_CLIENT === 'sqlite3'
  ? { filename: env.DATABASE_URL }
  : env.DATABASE_URL

export const knexConfig: Knex.Config = {
  useNullAsDefault: true,
  client: env.DATABASE_CLIENT,
  connection,
  migrations: {
    extension: 'ts',
    directory: './src/database/migrations'
  }
}

export const knex = setupKnex(knexConfig)
