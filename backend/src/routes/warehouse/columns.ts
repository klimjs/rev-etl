import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { sql } from 'drizzle-orm'
import { columnsInputSchema } from '../../lib/types'
import { getErrorMessage } from '../../lib/utils'

const columnsRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post('/warehouse/columns', async (request, reply) => {
    const parsed = columnsInputSchema.safeParse(request.body)

    if (!parsed.success) {
      return reply.badRequest(parsed.error.issues[0].message)
    }

    const { table } = parsed.data

    const { db, pool } = fastify.getDbFromRequest(request)

    try {
      const result = await db.execute<{ column_name: string }>(
        sql`
          SELECT column_name
          FROM information_schema.columns
          WHERE table_schema = 'public'
            AND table_name = ${sql.identifier(table)}
          ORDER BY ordinal_position
        `,
      )

      const columns = result.rows.map((r) => r.column_name)

      return { columns }
    } catch (err) {
      return reply.internalServerError(getErrorMessage(err))
    } finally {
      await pool.end()
    }
  })
}

export default fp(columnsRoute)
