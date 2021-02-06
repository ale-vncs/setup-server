import Api from '../utils/api'
import PlayerBuilder from '../builder/player-builder'

const api = new Api()

beforeAll(async () => {
  await api.init()
})

describe('Test of controller player.ts', () => {
  it('Should create a new player', async () => {
    const newPlayer = new PlayerBuilder().build()
    const res = await api.post('/players').send(newPlayer)

    expect(res.body).toEqual({
      status: '201 - Created',
      msg: 'Jogador cadastrado com sucesso.',
      code: 'playerCreatedSuccess'
    })
  })
})
