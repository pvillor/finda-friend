import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetsRepository, SearchManyParams } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async searchMany({
    city,
    age,
    energy,
    size,
    independency,
    environment,
  }: SearchManyParams) {
    const pets = await prisma.pet.findMany({
      where: {
        age,
        energy,
        size,
        independency,
        environment,
        organization: {
          city: {
            contains: city,
            mode: 'insensitive',
          },
        },
      },
    })

    return pets
  }

  async findById(petId: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
