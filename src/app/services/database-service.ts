import { Sequelize } from 'sequelize'

import dbConfig from '../../database/config'

class DatabaseService {
  private readonly sequelize: Sequelize

  constructor () {
    const env = <keyof typeof dbConfig>process.env.NODE_ENV
    let dbData = {}
    if (env) {
      dbData = dbConfig[env]
    }

    this.sequelize = new Sequelize(dbData)
  }

  getConnection (): Sequelize {
    return this.sequelize
  }

  async closeConnection (): Promise<void> {
    await this.sequelize.close()
  }

  async checkConnection () {
    await this.sequelize.authenticate()
  }

  async dropAllTables () {
    await this.sequelize.sync({ force: true })
  }
}

export default new DatabaseService()
