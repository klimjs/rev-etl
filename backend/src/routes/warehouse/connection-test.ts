import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'

const connectionTest: FastifyPluginAsync = async (fastify) => {
  fastify.post('/warehouse/connection-test', async (request, reply) => {
    const { db, pool } = fastify.getDbFromRequest(request)

    try {
      await db.execute('SELECT 1')
      return { ok: true }
    } catch (err: any) {
      // TODO: add proper type
      return reply.internalServerError(err.message)
    } finally {
      await pool.end()
    }
  })
}

export default fp(connectionTest)
