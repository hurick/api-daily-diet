import type {
  FastifyRequest,
  FastifyReply
} from 'fastify'

export const checkSessionId = async ({ cookies }: FastifyRequest, reply: FastifyReply) => {
  if (!cookies.sessionId) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}
