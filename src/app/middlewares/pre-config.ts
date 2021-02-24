import { Request, Response, NextFunction } from 'express'
import crypt from '../utils/crypt'
import DatabaseService from '@services/database-service'
import AbstractMiddleware from '@src/app/middlewares/abstract-middleware'
import { logger } from '@logger'
import { setHttpContext } from '@utils/http-context'
import Gender from '@models/gender'
import { ApiError } from '@src/app/exceptions/api-error'

class PreConfig extends AbstractMiddleware {
  async init (req: Request, res: Response, next: NextFunction): Promise<unknown> {
    try {
      await DatabaseService.checkConnection()
    } catch (e) {
      logger.error(`Error na conexão com banco de dados: ${e}`)
      throw new ApiError('Internal Server Error', 'connectionDatabaseError')
    }

    if (process.env.SECURITY_ENABLED === 'true') {
      if (req.body && req.body.key) {
        try {
          req.body = JSON.parse(crypt.decrypt(req.body.key))
        } catch (err) {
          return this.result(res, {
            status: 'Bad Request',
            msg: 'badRequest'
          })
        }
      } else {
        return this.result(res, {
          status: 'Bad Request',
          msg: 'badRequest'
        })
      }
    }

    const allGenders = await Gender.findAll({ raw: true })
    const listGenderId = allGenders.map(gender => gender.gender_id)

    setHttpContext('gender', listGenderId)

    return next()
  }
}

export default new PreConfig()
