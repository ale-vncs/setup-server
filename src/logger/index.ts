import winston, { format } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import { getHttpContext, contextKeys } from '@utils/http-context'

const { combine, timestamp, printf, colorize } = format

const colors = {
  trace: 'magenta',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  debug: 'blue',
  info: 'green bold',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  error: 'red'
}

class Logger {
  private readonly logger: winston.Logger

  constructor () {
    this.logger = winston.createLogger({
      transports: [
        new DailyRotateFile({
          filename: './logs/file-%DATE%.log',
          datePattern: 'DD_MM_yyyy',
          maxFiles: '14d',
          format: combine(
            timestamp(),
            this.fileFormat()
          )
        }),
        new winston.transports.Console({
          level: process.env.LOGGER_LEVEL || 'debug',
          format: combine(
            colorize({ colors: colors }),
            timestamp(),
            this.consoleFormat()
          )
        })
      ],
      exitOnError: false
    })
  }

  getLogger () {
    return this.logger
  }

  private getLoggerContext (key: keyof contextKeys['req']): string {
    const values = getHttpContext('req')
    return values ? values[key] : '-'
  }

  private consoleFormat () {
    return printf(({ level, message, timestamp }) => {
      return `${timestamp} [ ${level} ] [ ${this.getLoggerContext('requestId')} ] [ ${this.getLoggerContext('method')} :: ${this.getLoggerContext('originalUrl')} ]: ${message}`
    })
  }

  private fileFormat () {
    return printf(({ level, message, timestamp }) => {
      return JSON.stringify({
        timestamp,
        level,
        id: this.getLoggerContext('requestId'),
        method: this.getLoggerContext('method'),
        url: this.getLoggerContext('originalUrl'),
        message
      })
    })
  }

  activateLogger (status: boolean) {
    this.logger.transports.forEach((t) => (t.silent = !status))
  }
}

const instance = new Logger()

export const activateLogger = instance.activateLogger

export const logger = {
  info: (text: string): winston.Logger => instance.getLogger().info(text),
  error: (text: string): winston.Logger => instance.getLogger().error(text),
  debug: (text: string): winston.Logger => instance.getLogger().debug(text),
  warn: (text: string): winston.Logger => instance.getLogger().warn(text),
  enabled: (status: boolean): void => instance.activateLogger(status)
}
