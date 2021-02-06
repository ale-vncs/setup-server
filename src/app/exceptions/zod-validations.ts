import AbstractException from './abstract-exception'
import { logger } from '@logger'
import { ResultData } from '@typings/result'
import { ZodError } from 'zod'
import { exceptions } from '@utils/translate'

class ZodValidations extends AbstractException<ZodError> {
  exception (error: ZodError): ResultData {
    logger.error(`Error na validação do zod: ${JSON.stringify(error)}`)
    const allErrors = error.issues.map(err => {
      const replaceFields = []
      switch (err.code) {
        case 'invalid_type': {
          replaceFields.push(err.expected)
          let text = exceptions.invalid_type
          replaceFields.map(rf => {
            text = text.replace('%', rf)
          })
          return {
            field: err.path.join('.'),
            error: text
          }
        }

        default: {
          return {
            field: err.path.join('.'),
            error: err.message
          }
        }
      }
    })

    return {
      status: 'Unprocessable Entity',
      msg: 'validationError',
      body: allErrors
    }
  }
}

export default ZodValidations
