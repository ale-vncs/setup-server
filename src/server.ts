import App from './app'
import { logger } from '@logger'

enum ExitStatus {
  Failure
}

(async (): Promise<void> => {
  process.on('unhandledRejection', (reason) => {
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
      await server.close()
    }))
  } catch (e) {
    logger.error(`Error ao iniciar servidor: ${e.message}`)
    process.exit(ExitStatus.Failure)
  }
})()
