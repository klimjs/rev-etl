import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'

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
    // TODO: add validation
    const { connectionString } = request.body as { connectionString?: string }

    if (!connectionString) {
      throw fastify.httpErrors.badRequest('Connection string is required')
    }

    // create a temporary pool and drizzle instance per request
    const pool = new Pool({ connectionString })
    const db = drizzle(pool)

    return { db, pool }
  })
}

export default fp(dbPlugin)
