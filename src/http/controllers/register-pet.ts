import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerPetParamsSchema = z.object({
    organizationId: z.string().uuid(),
  })

  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    age: z.string(),
    size: z.string(),
    energy: z.string(),
    independency: z.string(),
    environment: z.string(),
  })

  const { organizationId } = registerPetParamsSchema.parse(request.params)

  const { name, description, age, size, energy, independency, environment } =
    registerBodySchema.parse(request.body)

  try {
    const registerPetUseCase = makeRegisterPetUseCase()

    const { pet } = await registerPetUseCase.execute({
      name,
      description,
      age,
      size,
      energy,
      independency,
      environment,
      organizationId,
    })

    return reply.status(201).send({
      petId: pet.id,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
