import Events from '@models/events'
import { logger } from '@logger'
import { Transaction } from 'sequelize'
import DatabaseService from '@services/database-service'
import constants from '@src/config/constants'
import { setHttpContext, getHttpContext } from '@utils/http-context'

interface OptionLogEvent {
  id?: string;
  name?: string;
}

abstract class AbstractService {
  protected Constants = constants

  protected setContext = setHttpContext

  protected getContext = getHttpContext

  async logEvent (text: string, options?: OptionLogEvent): Promise<void> {
    const data = this.prepareDataLog(options)

    logger.info(`[${data.name}] Cadastrando evento: ${text}`)
    await Events.create({
      employee_id: data.id,
      employee_name: data.name,
      event: text
    })
    logger.info('Evento cadastrado')
  }

  protected async getTransaction (): Promise<Transaction> {
    return await DatabaseService.getConnection().transaction()
  }

  private prepareDataLog (options?: OptionLogEvent): { id: string, name: string } {
    const employeeData = getHttpContext('employee')

    const data = {
      id: 'desconhecido',
      name: 'desconhecido'
    }

    if (employeeData) {
      data.id = employeeData.employee_id
      data.name = employeeData.name
    } else if (options) {
      if (options.id) { data.id = options.id }
      if (options.name) { data.name = options.name }
    }

    return data
  }
}

export default AbstractService
