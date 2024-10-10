import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Pets (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet details', async () => {
    const orgResponse = await request(app.server).post('/orgs').send({
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
      confirmPassword: '1234',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '1234',
    })

    const { orgId } = orgResponse.body
    const { token } = authResponse.body

    await request(app.server)
      .post(`/orgs/${orgId}/pets`)
      .send({
        name: 'Pet',
        description: 'pet description',
        age: 'puppy',
        size: 'small',
        energy: 'low',
        independency: 'low',
        environment: 'spacious',
      })
      .set('Authorization', `Bearer ${token}`)

    await request(app.server)
      .post(`/orgs/${orgId}/pets`)
      .send({
        name: 'Pet',
        description: 'pet description',
        age: 'puppy',
        size: 'small',
        energy: 'low',
        independency: 'low',
        environment: 'spacious',
      })
      .set('Authorization', `Bearer ${token}`)

    await request(app.server)
      .post(`/orgs/${orgId}/pets`)
      .send({
        name: 'Pet',
        description: 'pet description',
        age: 'puppy',
        size: 'small',
        energy: 'low',
        independency: 'low',
        environment: 'spacious',
      })
      .set('Authorization', `Bearer ${token}`)

    const searchPetsWithoutCityParamsResponse = await request(app.server).get(
      '/pets',
    )

    expect(searchPetsWithoutCityParamsResponse.statusCode).toEqual(400)

    const searchPetsResponse = await request(app.server).get('/pets?city=city')
    const { pets } = searchPetsResponse.body

    expect(searchPetsResponse.statusCode).toEqual(200)
    expect(pets).toHaveLength(3)
  })
})
