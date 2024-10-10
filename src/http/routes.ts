import { authenticate } from './controllers/authenticate'
import { registerOrganization } from './controllers/register-organization'
import { FastifyInstance } from 'fastify'
import { registerPet } from './controllers/register-pet'
import { getPetDetails } from './controllers/get-pet-details'
import { searchPets } from './controllers/search-pets'
import { verifyJWT } from './middlewares/verify-jwt'
import { refresh } from './controllers/refresh'

export async function appRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  app.post('/orgs', registerOrganization)
  app.post(
    '/orgs/:organizationId/pets',
    { onRequest: [verifyJWT] },
    registerPet,
  )

  app.get('/pets/:petId', getPetDetails)
  app.get('/pets', searchPets)
}
