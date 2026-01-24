import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { sql } from 'drizzle-orm'

const columnsRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post('/warehouse/columns', async (request, reply) => {
    const { db, pool } = fastify.getDbFromRequest(request)

    // TODO: add validation
    const { table } = request.body as {
      connectionString?: string
      table?: string
    }

    if (!table) return reply.badRequest('table is required')

    try {
      const result = await db.execute<{ column_name: string }>(
        sql`
          SELECT column_name
          FROM information_schema.columns
          WHERE table_schema = 'public'
            AND table_name = ${table}
          ORDER BY ordinal_position
        `,
      )

      const columns = result.rows.map((r) => r.column_name)

      return { columns }
    } catch (err: any) {
      return reply.internalServerError(err.message)
    } finally {
      await pool.end()
    }
  })
}

export default fp(columnsRoute)
