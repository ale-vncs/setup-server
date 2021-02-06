import { NextFunction, Request, Response } from 'express'
import { logger } from '@logger'
import AbstractMiddleware from '@src/app/middlewares/abstract-middleware'
import { checkTokenResponse } from '@typings/token'

class Auth extends AbstractMiddleware {
  private tokenInfo (req: Request): checkTokenResponse | undefined {
    logger.debug(`Headers: ${JSON.stringify(req.headers)}`)
    if (req.headers.authorization && req.headers['refresh-token']) {
      const refreshToken = <string>req.headers['refresh-token']
      const reconnectKey = <string | undefined>req.headers['reconnect-key']
      const [bearer, token] = req.headers.authorization.split(' ')
      const checkToken = this.checkToken(token, refreshToken, reconnectKey)

      if (bearer === 'Bearer' && checkToken) {
        return checkToken
      }
    }
    return undefined
  }

  async admin (req: Request, res: Response, next: NextFunction): Promise<void> {
    logger.info('Iniciando autenticação de funcionário')
    const decode = this.tokenInfo(req)
    logger.debug(`Decode Data: ${JSON.stringify(decode)}`)
    if (decode && decode.type === 'ADMIN') {
      logger.info(`Buscando funcionário: ${decode.id}`)

      return next()
    } else {
      logger.warn('Funcionário não autorizado')
      return this.result(res, {
        status: 'Unauthorized',
        msg: 'userNotAuthorization'
      })
    }
  }

  async user (req: Request, res: Response, next: NextFunction) {
    logger.info('Iniciando autenticação de usuário')
    const decode = this.tokenInfo(req)

    if (decode && decode.type === 'USER') {
      return next()
    } else {
      return this.result(res, {
        status: 'Unauthorized',
        msg: 'userNotAuthorization'
      })
    }
  }
}

export default new Auth()
