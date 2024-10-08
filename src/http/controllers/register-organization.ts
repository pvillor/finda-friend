import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
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
    confirmPassword,
  } = registerBodySchema.parse(request.body)

  await prisma.organization.create({
    data: {
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
      passwordHash: password,
    },
  })

  return reply.status(201).send()
}
