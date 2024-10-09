import { Pet, Prisma } from '@prisma/client'
import { PetsRepository, SearchManyParams } from '../pets-repository'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private orgsRepository: InMemoryOrgsRepository) {
    //
  }

  async searchMany({
    city,
    age,
    energy,
    environment,
    size,
    independency,
  }: SearchManyParams) {
    const orgs = this.orgsRepository.items.filter((org) => org.city === city)

    const pets = this.items.filter((item) => {
      const fromOrgs = orgs.some((org) => org.id === item.organizationId)
      const matchesAge = !age || age === item.age
      const matchesEnergy = !energy || energy === item.energy
      const matchesEnvironment =
        !environment || environment === item.environment
      const matchesSize = !size || size === item.size
      const matchesIndependency =
        !independency || independency === item.independency

      return (
        fromOrgs &&
        matchesAge &&
        matchesEnergy &&
        matchesEnvironment &&
        matchesSize &&
        matchesIndependency
      )
    })

    return pets
  }

  async findById(petId: string) {
    const pet = this.items.find((item) => item.id === petId)

    if (!pet) {
      return null
    }

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const org = await this.orgsRepository.findById(data.organizationId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = {
      id: 'pet-1',
      name: data.name,
      description: data.description ?? null,
      age: data.age,
      size: data.size,
      energy: data.energy,
      independency: data.independency,
      environment: data.environment,
      organizationId: org.id,
    }

    this.items.push(pet)

    return pet
  }
}
