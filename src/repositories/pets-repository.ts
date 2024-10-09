import { Pet, Prisma } from '@prisma/client'

export interface SearchManyParams {
  city: string
  age?: string
  size?: string
  energy?: string
  independency?: string
  environment?: string
}

export interface PetsRepository {
  findById(petId: string): Promise<Pet | null>
  searchMany(params: SearchManyParams): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
