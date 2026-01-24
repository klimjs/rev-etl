import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { transformRows } from '../../lib/utils'
import { JsonPreviewInput } from '../../lib/types'

const DEFAULT_LIMIT = 5

const jsonPreview: FastifyPluginAsync = async (fastify) => {
  fastify.post('/warehouse/json-preview', async (request, reply) => {
    // TODO: add validation
    const {
      table,
      limit = DEFAULT_LIMIT,
      mapping,
    } = request.body as JsonPreviewInput

    if (!table) return reply.badRequest('table is required')

    if (!mapping || !Array.isArray(mapping) || mapping.length === 0) {
      return reply.badRequest('mapping is required')
    }

    const { pool } = fastify.getDbFromRequest(request)

    try {
      // TODO: fix types
      // TODO: add SQL injection protection
      const result = await pool.query<Record<string, any>>(
        `SELECT * FROM ${table} LIMIT $1`,
        [limit],
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
