import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface SearchPetsUseCaseRequest {
  city: string
  age?: string
  size?: string
  energy?: string
  environment?: string
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {
    //
  }

  async execute({
    city,
    age,
    size,
    energy,
    environment,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.searchMany({
      city,
      age,
      size,
      energy,
      environment,
    })

    return { pets }
  }
}
