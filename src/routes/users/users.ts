import type { FastifyInstance, RouteOptions } from 'fastify'
import type { CookieSerializeOptions } from '@fastify/cookie'

import { checkSessionId } from '../../middlewares/check-session-id.ts'

const COOKIES_OPTIONS: CookieSerializeOptions = {
  path: '/',
  maxAge: 60 * 60 * 24 * 7
}

const ROUTE_OPTIONS: Partial<RouteOptions> = {
  preHandler: [checkSessionId],
}

export const users = async (app: FastifyInstance) => {}
