import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { getErrorMessage } from '../../lib/utils'

const tables: FastifyPluginAsync = async (fastify) => {
  fastify.post('/warehouse/tables', async (request, reply) => {
    const { db, pool } = fastify.getDbFromRequest(request)

    try {
      const result = await db.execute<{
        tablename: string
      }>(`
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
        ORDER BY tablename
      `)

      return {
        tables: result.rows.map((r) => r.tablename),
      }
    } catch (err) {
      return reply.internalServerError(getErrorMessage(err))
    } finally {
      await pool.end()
    }
  })
}

export default fp(tables)
