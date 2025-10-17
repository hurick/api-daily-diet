import { config } from 'dotenv'

import * as z from 'zod'

const envOptions = ['development', 'test', 'production'] as const

const envConfig: Record<typeof envOptions[number], { path: string }> = {
  development: { path: '.env' },
  test: { path: '.env.test' },
  production: { path: '.env' }
}

config({
  ...envConfig[process.env.NODE_ENV as keyof typeof envConfig],
  quiet: true
})

const envSchema = z.object({
  NODE_ENV: z.enum(envOptions).default('development'),
  PORT: z.coerce.number().default(3333),
  DATABASE_CLIENT: z.enum(['sqlite3', 'pg']),
  DATABASE_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error(z.prettifyError(_env.error))
  process.exit(1)
}

export const env = _env.data
