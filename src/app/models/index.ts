import fs from 'fs'
import path from 'path'
import { ModelCtor } from 'sequelize'
import { listImportModel, clearModel } from '@typings/models'
import { logger } from '@logger'

class Models {
  private listImportModel: { [key: string]: listImportModel } = {}
  private listStartModel: { [key: string]: ModelCtor<any> } = {}

  async init () {
    logger.info('Iniciando os models')
    await this.getModel()
    this.startModel()
    this.startAssociate()
  }

  private async getModel () : Promise<void> {
    const listFileModels = fs.readdirSync(__dirname).filter(fileModel => (!fileModel.includes('index')))
    for (const fileModel of listFileModels) {
      const model = await import(path.join(__dirname, fileModel))
      const nameObj = fileModel.split('.')[0]
      this.listImportModel[nameObj] = model
    }
  }

  private startModel () : void {
    for (const model in this.listImportModel) {
      const nameModelSplit = model.split('_')
      let modelNameFinal = ''
      for (const modelName of nameModelSplit) {
        modelNameFinal += modelName.charAt(0).toUpperCase() + modelName.substr(1)
      }
      logger.info(`Model iniciado: ${modelNameFinal}`)
      this.listStartModel[modelNameFinal] = this.listImportModel[model].default
    }
    logger.info('')
    logger.info('')
  }

  private startAssociate (): void {
    logger.info('Iniciando associações dos models')
    for (const model in this.listImportModel) {
      if (this.listImportModel[model].associate) {
        this.listImportModel[model].associate(this.listStartModel)
        logger.info(`Associação do model: ${model}`)
      }
    }
    logger.info('')
    logger.info('')
  }

  async clearModels (listModel: clearModel[]): Promise<void> {
    for (const objModel of listModel) {
      await this.listStartModel[objModel.model].destroy({ where: objModel.where || {}, force: true })
    }
  }
}

export default new Models()
