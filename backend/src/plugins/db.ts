import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import { connectionStringSchema } from '../lib/types'

const STATEMENT_TIMEOUT = 10000
const QUERY_TIMEOUT = 10000

declare module 'fastify' {
  interface FastifyInstance {
    // TODO: add proper type
    getDbFromRequest: (request: any) => {
      db: ReturnType<typeof drizzle>
      pool: Pool
    }
  }
}

const dbPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.decorate('getDbFromRequest', (request) => {
    const parsed = connectionStringSchema.safeParse(request.body)

    if (!parsed.success) {
      throw fastify.httpErrors.badRequest(parsed.error.issues[0].message)
    }

    const { connectionString } = parsed.data

    // create a temporary pool and drizzle instance per request
    const pool = new Pool({
      connectionString,
      statement_timeout: STATEMENT_TIMEOUT,
      query_timeout: QUERY_TIMEOUT,
    })
    const db = drizzle(pool)

    return { db, pool }
  })
}

export default fp(dbPlugin)
