import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeRegisterOrganizationUseCase } from '@/use-cases/factories/make-register-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z
    .object({
      responsibleName: z.string(),
      email: z.string().email(),
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
    const registerOrganizationUseCase = makeRegisterOrganizationUseCase()

    const { org } = await registerOrganizationUseCase.execute({
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

    return reply.status(201).send({
      orgId: org.id,
    })
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
