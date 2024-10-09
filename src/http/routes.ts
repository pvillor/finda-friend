import { authenticate } from './controllers/authenticate'
import { registerOrganization } from './controllers/register-organization'
import { FastifyInstance } from 'fastify'
import { registerPet } from './controllers/register-pet'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrganization)
  app.post('/sessions', authenticate)

  app.post('/orgs/:orgId/pets', registerPet)
}
