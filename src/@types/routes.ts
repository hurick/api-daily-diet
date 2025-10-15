import type {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRegisterOptions
} from 'fastify'

export interface Route {
  paths: (app: FastifyInstance) => Promise<void>
  options: FastifyRegisterOptions<FastifyPluginOptions>
}
