import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetDetailsUseCase } from '../get-pet-details'

export function makeGetPetDetailsPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const getPetDetailsPetUseCase = new GetPetDetailsUseCase(petsRepository)

  return getPetDetailsPetUseCase
}
