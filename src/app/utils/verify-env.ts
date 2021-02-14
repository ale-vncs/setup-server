import { ApiError } from '@src/app/exceptions/api-error'
import { logger } from '@logger'

class VerifyEnv {
  private listEnv: string[]

  constructor (listEnv: string[]) {
    this.listEnv = listEnv
  }

  verifyEnv (): void {
    const listEnvNotSet: string[] = []
    this.listEnv.forEach(env => {
      if (!process.env[env]) {
        listEnvNotSet.push(env)
      }
    })

    if (listEnvNotSet.length) {
      logger.error(`Variaveis de ambiente não inciado: ${JSON.stringify(listEnvNotSet)}`)
      throw new ApiError('Internal Server Error', 'varEnvNotSetup', JSON.stringify(listEnvNotSet))
    }
  }
}

export default VerifyEnv
