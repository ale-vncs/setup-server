import httpContext from 'express-http-context'
import 'dotenv/config'
import 'express-async-errors'
import './app/utils/module-alias'
import express, { Express } from 'express'
import http from 'http'
import cors from 'cors'
import socketIo from 'socket.io'
import Routes from './app/routes'
import models from './app/models'

import DataBaseService from '@services/database-service'
import { pathApi } from './config/paths'
import { logger } from '@logger'

class App {
  private app = express()
  private server = new http.Server(this.app)
  private routes = new Routes(this.app)
  private io = socketIo(this.server)
  private env = process.env.NODE_ENV

  async init (): Promise<void> {
    this.setupMiddleware()
    await DataBaseService.checkConnection()
    await models.init() // Inicia os models
    await this.routes.init() // Inicia as rotas
    // new socket().init(io)
  }

  setupMiddleware (): void {
    this.app.use(cors())
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
    logger.info('Desligando servidor...')
    return new Promise((resolve) => this.server.close(async (err) => {
      if (err) {
        logger.error(`Error ao fechar servidor: ${err}`)
        process.exit(1)
      }
      logger.info('Desligando base de dados...')
      await DataBaseService.closeConnection()
      process.exit(0)
    }))
  }

  getApp (): Express {
    return this.app
  }
}

export default App
