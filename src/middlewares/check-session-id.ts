import { knex } from '../database/setup.ts'

import type { FastifyRequest, FastifyReply } from 'fastify'

export const checkSessionId = async (request: FastifyRequest, reply: FastifyReply) => {
  const { cookies } = request

  if (!cookies.sessionId) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }

  const selectedUser = await knex('users')
    .where({ session_id: cookies.sessionId })
    .first()

  if (!selectedUser) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }

  request.user = selectedUser
}
