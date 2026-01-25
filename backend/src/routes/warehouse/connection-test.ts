import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { getErrorMessage } from '../../lib/utils'

const connectionTest: FastifyPluginAsync = async (fastify) => {
  fastify.post('/warehouse/connection-test', async (request, reply) => {
    const { db, pool } = fastify.getDbFromRequest(request)

    try {
      await db.execute('SELECT 1')
      return { ok: true }
    } catch (err) {
      return reply.internalServerError(getErrorMessage(err))
    } finally {
      await pool.end()
    }
  })
}

export default fp(connectionTest)
