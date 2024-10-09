import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RegisterPetUseCaseRequest {
  name: string
  description?: string
  age: string
  size: string
  energy: string
  independency: string
  environment: string
  organizationId: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
  ) {
    //
  }

  async execute({
    name,
    description,
    age,
    size,
    energy,
    independency,
    environment,
    organizationId,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const organization = await this.orgsRepository.findById(organizationId)

    if (!organization) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      size,
      energy,
      independency,
      environment,
      organizationId,
    })

    return { pet }
  }
}
