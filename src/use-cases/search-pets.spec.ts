import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetsUseCase } from './search-pets'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search for pets', async () => {
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

    await petsRepository.create({
      name: 'Pet',
      description: 'pet description',
      age: 'puppy',
      size: 'small',
      energy: 'high',
      independency: 'high',
      environment: 'spacious',
      organizationId: org.id,
    })

    await petsRepository.create({
      name: 'Pet 2',
      description: 'pet description',
      age: 'adult',
      size: 'big',
      energy: 'low',
      independency: 'low',
      environment: 'small',
      organizationId: org.id,
    })

    const { pets } = await sut.execute({
      city: 'city',
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Pet' }),
      expect.objectContaining({ name: 'Pet 2' }),
    ])
  })
})
