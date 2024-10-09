import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  findById(petId: string): Promise<Pet | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
