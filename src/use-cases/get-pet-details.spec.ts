import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsUseCase } from './get-pet-details'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to get a pet details', async () => {
    const org = await orgsRepository.create({
      responsibleName: 'John Doe',
      email: 'johndoe@example.com',
      cep: '00000-000',
      state: 'state',
      city: 'city',
      neighborhood: 'neighborhood',
      street: 'street',
      whatsapp: '+00 00 000000000',
      latitude: 0,
      longitude: 0,
      passwordHash: '1234',
    })

    const createdPet = await petsRepository.create({
      name: 'Pet',
      description: 'pet description',
      age: 'puppy',
      size: 'small',
      energy: 'low',
      independency: 'low',
      environment: 'spacious',
      organizationId: org.id,
    })

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to get a pet details with wrong id', async () => {
    expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
