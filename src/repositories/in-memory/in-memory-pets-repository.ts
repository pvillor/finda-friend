import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: 'pet-1',
      name: data.name,
      description: data.description ?? null,
      age: data.age,
      size: data.size,
      energy: data.energy,
      independency: data.independency,
      environment: data.environment,
      organizationId: data.organizationId,
    }

    this.items.push(pet)

    return pet
  }
}
