import Api from '../utils/api'

const api = new Api()

beforeAll(async () => {
  await api.init()
})

describe('Test of controller player.ts', () => {
  it('Should create a new player', async () => {
    const res = await api.post('/players').send({
      name: 'rrr'
    })

    expect(res.body).toEqual({
      status: '201 - Created',
      msg: 'Jogador criado com sucesso.',
      code: 'playerCreatedSuccess',
      body: {}
    })
  })
})
