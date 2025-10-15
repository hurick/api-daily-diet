import fastify from 'fastify'

import cookie from '@fastify/cookie'

import { routes } from './routes/index.ts'

export const app = fastify()

app.register(cookie)

routes.forEach(({ paths, options }) => {
  app.register(paths, options)
})
