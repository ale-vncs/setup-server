import { Response } from 'express'
import { logger } from '@logger'
import result from '../utils/result'
import tokenUtils from '@utils/token'
import { checkTokenResponse } from '@typings/token'
import tokenService from '@services/token-service'
import cryptUtils from '@utils/crypt'
import { ResultData } from '@typings/result'
import { setHttpContext, getHttpContext } from '@utils/http-context'

abstract class AbstractMiddleware {
  protected setContext = setHttpContext

  protected getContext = getHttpContext

  protected result (res: Response, data: ResultData): void {
    result(res, data)
  }

  protected checkToken (token: string, refreshToken: string, reconnectKey?: string): checkTokenResponse {
    logger.info('Verificando token')
    const decodeToken = tokenUtils.verifyToken(token)
    const decodeRefreshToken = tokenUtils.verifyToken(refreshToken)
    logger.info('Token está valido')

    if (decodeToken && decodeRefreshToken) {
      if (token === decodeRefreshToken.token) {
        const { token, refreshToken } = decodeToken.type === 'USER'
          ? tokenService.generateUserToken(decodeToken.id)
          : tokenService.generateAdminToken(decodeToken.id)
        return {
          id: decodeToken.id,
          token,
          refreshToken,
          type: decodeToken.type
        }
      }
    } else if (decodeRefreshToken) {
      const { token, refreshToken } = decodeRefreshToken.type === 'USER'
        ? tokenService.generateUserToken(decodeRefreshToken.id)
        : tokenService.generateAdminToken(decodeRefreshToken.id)
      return {
        id: decodeRefreshToken.id,
        token,
        refreshToken,
        type: decodeRefreshToken.type
      }
    } else if (reconnectKey) {
      const keyDecrypt = cryptUtils.decrypt(reconnectKey)
      logger.info('Gerando novo token')

      if (!keyDecrypt) {
        throw new Error('Chave de reconexão invalida')
      }

      const {
        id,
        type
      } = JSON.parse(keyDecrypt)

      const { token, refreshToken } = type === 'USER'
        ? tokenService.generateUserToken(id)
        : tokenService.generateAdminToken(id)
      return {
        id: id,
        token,
        refreshToken,
        type: type
      }
    }

    throw new Error('Validade do token expirou')
  }
}

export default AbstractMiddleware
