import { InMemoryOrgsRepository } from '@/repositories/in-memory-orgs-repository'
import { PrismaOrgsRepository } from '@/repositories/prisma-orgs-repository'
import { RegisterOrganizationUseCase } from '@/use-cases/register-organization'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z
    .object({
      responsibleName: z.string(),
      email: z.string(),
      cep: z.string(),
      state: z.string(),
      city: z.string(),
      neighborhood: z.string(),
      street: z.string(),
      latitude: z.number(),
      longitude: z.number(),
      whatsapp: z.string(),
      password: z.string(),
      confirmPassword: z.string(),
    })
    .refine((data) => {
      if (data.confirmPassword !== data.password) {
        return reply.status(400).send({
          message: 'Passwords must match',
        })
      }

      return true
    })

  const {
    responsibleName,
    email,
    cep,
    state,
    city,
    neighborhood,
    street,
    whatsapp,
    latitude,
    longitude,
    password,
  } = registerBodySchema.parse(request.body)

  try {
    const orgsRepository = new InMemoryOrgsRepository()
    const registerOrganizationUseCase = new RegisterOrganizationUseCase(orgsRepository)

    await registerOrganizationUseCase.execute({
      responsibleName,
      email,
      cep,
      state,
      city,
      neighborhood,
      street,
      whatsapp,
      latitude,
      longitude,
      password,
    })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
