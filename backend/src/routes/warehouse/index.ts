import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import connectionTest from './connection-test'
import tables from './tables'
import columns from './columns'
import jsonPreview from './json-preview'

const warehouseRoutes: FastifyPluginAsync = async (fastify) => {
  void fastify.register(connectionTest)
  void fastify.register(tables)
  void fastify.register(columns)
  void fastify.register(jsonPreview)
}

export default fp(warehouseRoutes)
