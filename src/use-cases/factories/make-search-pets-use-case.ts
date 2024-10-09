import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetsUseCase } from '../search-pets'

export function makeSearchPetsPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const searchPetsPetUseCase = new SearchPetsUseCase(petsRepository)

  return searchPetsPetUseCase
}
