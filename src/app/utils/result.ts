import { Response } from 'express'
import { messages } from './translate'
import { ResultData, statusCode } from '@typings/result'

const result = (res: Response, data: ResultData): void => {
  res.status(statusCode[data.status]).send({
    status: `${statusCode[data.status]} - ${data.status}`,
    code: data.msg || undefined,
    msg: messages[data.msg],
    body: data.body || undefined,
    token: data.token || res.locals.token,
    refreshToken: data.refreshToken || res.locals.refreshToken,
    error: data.error || undefined,
    keyConnection: data.keyConnection
  })
}

export default result
