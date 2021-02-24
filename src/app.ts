import '../src/config/init-env'
import httpContext from 'express-http-context'
import helmet from 'helmet'
import 'express-async-errors'
import './app/utils/module-alias'
import express, { Express } from 'express'
import http from 'http'
import cors from 'cors'
import socketIo from 'socket.io'
import Routes from './app/routes'
import models from './app/models'

import DataBaseService from '@services/database-service'
import VerifyEnv from '@utils/verify-env'
import { pathApi } from './config/paths'
import { logger } from '@logger'
import { promisify } from 'util'

enum ExitStatus {
  Success,
  Failure
}

class App {
  private app = express()
  private server = new http.Server(this.app)
  private routes = new Routes(this.app)
  private io = socketIo(this.server)
  private env = process.env.NODE_ENV
  private serverInstance?: http.Server;

  async init (): Promise<void> {
    this.verifyEnv()
    this.setupMiddleware()
    await DataBaseService.checkConnection()
    await models.init() // Inicia os models
    await this.routes.init() // Inicia as rotas
    // new socket().init(io)
  }

  setupMiddleware (): void {
    this.app.use(cors())
    this.app.use(helmet())
    this.app.use(express.json())
    this.app.use(express.urlencoded({
      extended: true
    }))
    this.app.use(pathApi, express.static('public'))
    this.app.use(httpContext.middleware)
  }

  start (port: number): void {
    this.app.listen(port, () => {
      logger.info(`Servidor iniciado na porta: ${port}`)
    })
  }

  async close (): Promise<void> {
    if (!this.serverInstance) {
      logger.warn('Servidor não iniciado')
      return
    }

    const server = this.serverInstance
    logger.info('Desligando servidor...')

    try {
      await promisify(server.close)
      logger.info('Desligando base de dados...')
      await DataBaseService.closeConnection()

      logger.info('Tudo desligado com sucesso.')
      process.exit(ExitStatus.Success)
    } catch (e) {
      logger.error(`Error ao finalizar servidor: ${e}`)
      process.exit(ExitStatus.Failure)
    }
  }

  getApp (): Express {
    return this.app
  }

  verifyEnv (): void {
    const listEnv = [
      'NODE_ENV',
      'AWS_ACCESS_KEY_ID',
      'AWS_SECRET_ACCESS_KEY',
      'AWS_REGION',
      'AWS_BUCKET',
      'STORAGE_MODE',
      'SECRET_KEY_TOKEN',
      'SECRET_KEY_CRYPT',
      'SECURITY_ENABLED',
      'SESSION_TIME',
      'URL_WEB',
      'POSTGRES_HOST',
      'POSTGRES_USER',
      'POSTGRES_PASSWORD',
      'POSTGRES_PORT',
      'SENDGRID_API_KEY'
    ]

    new VerifyEnv(listEnv).verifyEnv()
  }
}

export default App
