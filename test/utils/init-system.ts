import PlayerBuilder from '../builder/player-builder'
import PlayerService from '@services/player-service'
import { PlayerInstance } from '@models/player'
import Api from './api'

export default class InitSystem {
  private playerSrv = new PlayerService()

  constructor (private api: Api) {
    this.api = api
  }

  async createRandomPlayer (): Promise<PlayerInstance> {
    const player = new PlayerBuilder().build()
    return await this.playerSrv.createPlayer(player)
  }
}
