import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterOrganizationUseCaseRequest {
  responsibleName: string
  email: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  whatsapp: string
  latitude: number
  longitude: number
  password: string
}

export class RegisterOrganizationUseCase {
  constructor(private orgsRepository: any) { }

  async execute({
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
  }: RegisterOrganizationUseCaseRequest) {
    const passwordHash = await hash(password, 6)

    const orgWithSameEmail = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    if (orgWithSameEmail) {
      throw new Error('E-mail already exists')
    }

    await this.orgsRepository.create({
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
      passwordHash,
    })
  }
}
