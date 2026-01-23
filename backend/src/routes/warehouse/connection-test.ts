import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'

const connectionTest: FastifyPluginAsync = async (fastify) => {
  fastify.post('/connection-test', async (request, reply) => {
    // TODO: add validation
    const { connectionString } = request.body as { connectionString?: string }

    if (!connectionString) {
      return reply.badRequest('Connection string is required')
    }

    // create a temporary pool and drizzle instance per request
    const pool = new Pool({ connectionString })
    const db = drizzle(pool)

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
