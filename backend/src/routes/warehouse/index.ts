import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import connectionTest from './connection-test'
import tables from './tables'

const warehouseRoutes: FastifyPluginAsync = async (fastify) => {
  void fastify.register(connectionTest)
  void fastify.register(tables)
}

export default fp(warehouseRoutes)
