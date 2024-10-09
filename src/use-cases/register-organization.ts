import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { Organization } from '@prisma/client'
import { hash } from 'bcrypt'

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

interface RegisterOrganizationUseCaseResponse {
  org: Organization
}

export class RegisterOrganizationUseCase {
  constructor(private orgsRepository: OrgsRepository) {
    //
  }

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
  }: RegisterOrganizationUseCaseRequest): Promise<RegisterOrganizationUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
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

    return { org }
  }
}
