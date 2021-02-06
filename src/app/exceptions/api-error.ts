import { statusCode } from '@typings/result'
import { messages } from '@utils/translate'

class BaseError extends Error {
  constructor (message: string) {
    super(message)
    this.name = new.target.name
    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(this, new.target)
  }
}

export class ApiError extends BaseError {
  public readonly status: keyof typeof statusCode = 'Internal Server Error'
  public readonly description: messages
  public readonly body: unknown

  constructor (
    status: keyof typeof statusCode,
    description: messages,
    body?: unknown
  ) {
    super(status)
    this.status = status
    this.description = description
    this.body = body
  }
}
