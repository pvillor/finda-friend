import { registerOrganization } from './controllers/register-organization'
import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrganization)
}
