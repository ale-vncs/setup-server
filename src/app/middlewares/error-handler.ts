import { NextFunction, Request, Response } from 'express'
import result from '@utils/result'
import { ZodError } from 'zod'
import ZodValidations from '../exceptions/zod-validations'
import { JsonWebTokenError } from 'jsonwebtoken'
import { logger } from '@logger'
import { ResultData } from '@typings/result'
import { ApiError } from '@src/app/exceptions/api-error'

class ErrorHandler extends Error {
  status: ResultData['status'];
  message: ResultData['msg'];
  body: unknown;

  constructor (data: ResultData) {
    super()
    this.status = data.status
    this.message = data.msg
    this.body = data.body
  }

  static getError (error: Error, req: Request, res: Response, next: NextFunction): void {
    let resultData: ResultData
    if (error instanceof ZodError) {
      resultData = new ZodValidations().exception(error)
    } else if (error instanceof JsonWebTokenError) {
      logger.error(JSON.stringify(error))
      resultData = {
        status: 'Unauthorized',
        msg: 'tokenInvalid'
      }
    } else if (error instanceof ApiError) {
      logger.error(`Error no api: ${JSON.stringify(error)}`)
      resultData = {
        status: error.status,
        msg: error.description,
        ...(error.body && { body: error.body })
      }
    } else {
      logger.error(`ERROR MESSAGE: ${JSON.stringify(error)}`)
      resultData = {
        status: 'Internal Server Error',
        msg: 'unknownError'
      }
    }

    return result(res, resultData)
  }
}

export default ErrorHandler
