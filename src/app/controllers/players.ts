import * as zod from 'zod'
import AbstractController from '@src/app/controllers/abstract-controller'
import { Request, Response } from 'express'
import PlayerService from '@services/player-service'

class Players extends AbstractController {
  private playerSrv = new PlayerService()

  async getPlayer (req: Request, res: Response) {
    const listPlayer = await this.playerSrv.findAll()
    this.result(res, {
      status: 'OK',
      msg: 'requestDone',
      body: listPlayer
    })
  }

  async createPlayer (req: Request, res: Response) {
    const schemaCreatePlayer = zod.object({
      name: zod.string().min(3),
      email: zod.string().email(),
      gender_id: zod.number().positive(),
      birth_date: zod.string(),
      position_id: zod.number().positive(),
      password: zod.string().min(6),
      phone: zod.string().optional()
    })

    const body = schemaCreatePlayer.parse(req.body)
    const player = await this.playerSrv.createPlayer(body)

    this.result(res, {
      status: 'OK',
      msg: 'playerCreatedSuccess',
      body: player
    })
  }
}

export default new Players()
