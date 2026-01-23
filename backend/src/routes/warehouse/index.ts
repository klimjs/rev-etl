import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import connectionTest from './connection-test'

const warehouseRoutes: FastifyPluginAsync = async (fastify) => {
  void fastify.register(connectionTest)
}

export default fp(warehouseRoutes)
