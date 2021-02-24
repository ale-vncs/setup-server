import AbstractMiddleware from '@src/app/middlewares/abstract-middleware'
import { setHttpContext } from '@utils/http-context'
import { NextFunction, Request, Response } from 'express'
import randomBytes from 'random-bytes'
import { logger } from '@logger'
import { differenceInMilliseconds } from 'date-fns'

class TimeMiddleware extends AbstractMiddleware {
  setTime (req: Request, res: Response, next: NextFunction) {
    res.locals.timeIni = new Date().getTime()
    setHttpContext('req', {
      host: `${req.protocol}://${req.get('host')}`,
      method: req.method || '-',
      originalUrl: req.originalUrl || '-',
      requestId: randomBytes.sync(12).toString('hex') || '-'
    })

    res.on('finish', () => {
      logger.info(`Tempo de execução: ${differenceInMilliseconds(new Date(), res.locals.timeIni)} ms`)
    })

    next()
  }
}

export default new TimeMiddleware()
