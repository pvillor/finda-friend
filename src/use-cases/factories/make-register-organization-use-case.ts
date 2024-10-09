import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterOrganizationUseCase } from '../register-organization'

export function makeRegisterOrganizationUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const registerOrganizationUseCase = new RegisterOrganizationUseCase(
    orgsRepository,
  )

  return registerOrganizationUseCase
}
