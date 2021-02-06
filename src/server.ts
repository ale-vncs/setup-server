import App from './app'
import { logger } from '@logger'

enum ExitStatus {
  Success,
  Failure
}

(async (): Promise<void> => {
  process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Falha no servidor devido a: ${reason}`)
    throw reason
  })
  process.on('uncaughtException', error => {
    logger.error(`Falha no servidor devido a: ${error}`)
    process.exit(ExitStatus.Failure)
  })

  try {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3001
    const server = new App()

    await server.init()
    server.start(port)

    const exitSignal: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT', 'SIGHUP']
    exitSignal.forEach(sig => process.on(sig, async () => {
      try {
        await server.close()
        process.exit(ExitStatus.Success)
      } catch (e) {
        logger.error('Error ao desligar o servidor')
        process.exit(ExitStatus.Failure)
      }
    }))
  } catch (e) {
    logger.error(`Error ao iniciar servidor: ${e.message}`)
    process.exit(ExitStatus.Failure)
  }
})()
