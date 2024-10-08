import { describe, expect, it } from 'vitest'
import { RegisterOrganizationUseCase } from './register-organization'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

describe('Register Organization Use Case', () => {
  it('should be able to register', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const registerOrganizationUseCase = new RegisterOrganizationUseCase(
      orgsRepository,
    )

    const { org } = await registerOrganizationUseCase.execute({
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
      password: '1234',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash organization password upon registration', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const registerOrganizationUseCase = new RegisterOrganizationUseCase(
      orgsRepository,
    )

    const { org } = await registerOrganizationUseCase.execute({
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
      password: '1234',
    })

    const isPasswordCorrectlyHashed = await compare('1234', org.passwordHash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const registerOrganizationUseCase = new RegisterOrganizationUseCase(
      orgsRepository,
    )

    const email = 'johndoe@example.com'

    await registerOrganizationUseCase.execute({
      responsibleName: 'John Doe',
      email,
      cep: '00000-000',
      state: 'state',
      city: 'city',
      neighborhood: 'neighborhood',
      street: 'street',
      whatsapp: '+00 00 000000000',
      latitude: 0,
      longitude: 0,
      password: '1234',
    })

    await expect(() =>
      registerOrganizationUseCase.execute({
        responsibleName: 'John Doe',
        email,
        cep: '00000-000',
        state: 'state',
        city: 'city',
        neighborhood: 'neighborhood',
        street: 'street',
        whatsapp: '+00 00 000000000',
        latitude: 0,
        longitude: 0,
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
