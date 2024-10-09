import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(orgsRepository, petsRepository)

    await orgsRepository.create({
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
  })

  it('should be able to register', async () => {
    const { pet } = await sut.execute({
      name: 'Pet',
      description: 'pet description',
      age: 3,
      size: 'small',
      energy: 'low',
      independency: 'low',
      environment: 'spacious',
      organizationId: 'org-1',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to register with invalid organization id', async () => {
    await expect(() =>
      sut.execute({
        name: 'Pet',
        description: 'pet description',
        age: 3,
        size: 'small',
        energy: 'low',
        independency: 'low',
        environment: 'spacious',
        organizationId: 'org-wrong',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
