import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterOrganizationUseCase } from './register-organization'
import { compare } from 'bcrypt'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrganizationUseCase

describe('Register Organization Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrganizationUseCase(orgsRepository)
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute({
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
    const { org } = await sut.execute({
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
    const email = 'johndoe@example.com'

    await sut.execute({
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
      sut.execute({
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
