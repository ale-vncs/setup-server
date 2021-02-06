import App from '@src/app'
import models from '@models/.'
import request from 'supertest'
import { clearModel } from '@typings/models'
import { Express } from 'express'

export default class Api {
  server = new App()
  app: Express | undefined;

  constructor (
    private token = '',
    private refreshToken = ''
  ) {
    this.setTokenAndRefreshToken(token, refreshToken)
  }

  async init (): Promise<void> {
    await this.server.init()
    this.app = this.server.getApp()
  }

  setTokenAndRefreshToken (token: string, refreshToken: string): void {
    this.token = token
    this.refreshToken = refreshToken
  }

  postAdmin (url: string): request.Test {
    return request(this.app).post(url)
      .set('authorization', 'Bearer ' + this.token)
      .set('refresh-token', this.refreshToken)
  }

  getAdmin (url: string): request.Test {
    return request(this.app).get(url)
      .set('authorization', 'Bearer ' + this.token)
      .set('refresh-token', this.refreshToken)
  }

  putAdmin (url: string): request.Test {
    return request(this.app).put(url)
      .set('authorization', 'Bearer ' + this.token)
      .set('refresh-token', this.refreshToken)
  }

  deleteAdmin (url: string): request.Test {
    return request(this.app).delete(url)
      .set('authorization', 'Bearer ' + this.token)
      .set('refresh-token', this.refreshToken)
  }

  post (url: string): request.Test {
    return request(this.app).post(url)
  }

  get (url: string): request.Test {
    return request(this.app).get(url)
  }

  put (url: string): request.Test {
    return request(this.app).put(url)
  }

  delete (url: string): request.Test {
    return request(this.app).delete(url)
  }

  async reset (): Promise<void> {
    const listModelReset: clearModel[] = [ // Precisa está em ordem para apagar a base

    ]

    await models.clearModels(listModelReset)
  }
}
