import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { sql } from 'drizzle-orm'
import { transformRows } from '../../lib/utils'
import { jsonPreviewInputSchema, TableRow } from '../../lib/types'

const DEFAULT_LIMIT = 5

const jsonPreview: FastifyPluginAsync = async (fastify) => {
  fastify.post('/warehouse/json-preview', async (request, reply) => {
    const parsed = jsonPreviewInputSchema.safeParse(request.body)

    if (!parsed.success) {
      return reply.badRequest(parsed.error.issues[0].message)
    }

    const { table, limit = DEFAULT_LIMIT, mapping } = parsed.data

    const { db, pool } = fastify.getDbFromRequest(request)

    try {
      const result = await db.execute<TableRow>(
        sql`SELECT * FROM ${sql.identifier(table)} LIMIT ${limit}`,
      )

      return transformRows(result.rows, mapping)
    } catch (err: any) {
      return reply.internalServerError(err.message)
    } finally {
      await pool.end()
    }
  })
}

export default fp(jsonPreview)
