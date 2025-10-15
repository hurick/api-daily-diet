import 'fastify'

import { User } from '../users.ts'

declare module 'fastify' {
  export interface FastifyRequest {
    user?: User
  }
}
