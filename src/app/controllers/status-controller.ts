import AbstractController from '@src/app/controllers/abstract-controller'
import { Request, Response } from 'express'

class StatusController extends AbstractController {
  getStatus (req: Request, res: Response) {
    this.result(res, {
      status: 'OK',
      msg: 'requestDone',
      body: 'Tudo funcionando :)'
    })
  }
}

export default new StatusController()
