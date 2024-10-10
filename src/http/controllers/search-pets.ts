import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeSearchPetsPetUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const createPetParamsSchema = z.object({
    city: z.string().min(1),
    age: z.string().optional(),
    size: z.string().optional(),
    energy: z.string().optional(),
    environment: z.string().optional(),
  })

  const { city, age, energy, environment, size } = createPetParamsSchema.parse(
    request.query,
  )

  try {
    const searchPetsUseCase = makeSearchPetsPetUseCase()

    const pets = await searchPetsUseCase.execute({
      city,
      age,
      energy,
      environment,
      size,
    })

    return reply.status(200).send({ pets })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
