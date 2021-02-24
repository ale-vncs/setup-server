import { Express, Router as RouterExpress } from 'express'
import path from 'path'
import { readdirSync } from 'fs'
import { pathControllers } from '@src/config/paths'
import TimeMiddleware from '../middlewares/time-middleware'
import Auth from '../middlewares/auth'
import PreConfig from '../middlewares/pre-config'
import ErrorHandler from '../middlewares/error-handler'
import Permissions from '../middlewares/permissions'
import Multer from '../middlewares/multer'
import { logger } from '@logger'
import { EmployeeActionEnum } from '@enums/employee-action'
import { ApiError } from '@src/app/exceptions/api-error'

export interface RouterConfig {
  id: string;
  routes: {
    method: 'get' | 'post' | 'delete' | 'put';
    path: string;
    function: string;
    admin?: boolean;
    notAuth?: boolean;
    upload?: boolean;
    test?: boolean;
    dependencies?: string[];
    permissions?: EmployeeActionEnum[];
  }[];
}

interface RouterList {
  [key: string]: RouterConfig
}

class Router {
  private app: Express
  private routerName: string[] = []
  private routerList: RouterList = {}
  private extension = '';

  constructor (app: Express) {
    this.app = app
  }

  async init (): Promise<void> {
    logger.info('Iniciando Rotas')
    this.startMiddleware()
    await this.startRouter()
    this.endMiddleware()
  }

  private startMiddleware (): void {
    this.app.use(TimeMiddleware.setTime)
  }

  private endMiddleware (): void {
    this.app.use(ErrorHandler.getError)
    this.app.use('*', (req, res) => {
      logger.error('Rota não encontrada')
      res.status(404).json({
        status: '404 - Not Found',
        msg: 'Route not found'
      })
    })
  }

  private async startRouter (): Promise<void> {
    readdirSync(path.join(__dirname))
      .filter(fileName =>
        (!fileName.includes('index'))
      )
      .forEach(fileName => {
        this.extension = fileName.substr(-3)
        this.routerName.push(path.basename(fileName))
      })

    for (const filename of this.routerName) {
      const routerName = filename.split('.')[0]
      this.routerList[routerName] = (await import(path.join(__dirname, filename))).default
    }

    for (const router of Object.keys(this.routerList)) {
      logger.info(`===================  ${router.toUpperCase()}  ===================`)
      const routeExpress = RouterExpress()
      const currentRouter = this.routerList[router]
      for (const routerParam of currentRouter.routes) {
        const method = routerParam.method
        let pathName = `/${router + routerParam.path.replace('{id}', ':' + currentRouter.id)}`
        const functionName = routerParam.function
        const classFunction = (await import(path.join(__dirname, pathControllers, router + this.extension))).default

        const userAuthClass = Auth.user.bind(Auth)
        const adminAuthClass = Auth.admin.bind(Auth)
        const preConfigClass = PreConfig.init.bind(PreConfig)
        const newPermission = new Permissions(routerParam.permissions)
        const permissionsClass = newPermission.checkPermission.bind(newPermission)

        if (!classFunction[functionName]) {
          const msg = `Método ${functionName} não encontrado no controlador ${router}`
          logger.error(msg)
          throw new ApiError('Internal Server Error', 'methodNotFound')
        }

        const listFunction = [
          { name: 'PreConfig', class: preConfigClass },
          { name: 'Auth', class: routerParam.admin ? adminAuthClass : userAuthClass },
          { name: 'Perm', class: permissionsClass },
          { name: functionName, class: classFunction[functionName].bind(classFunction) }
        ]

        if (routerParam.notAuth) {
          const indexAuth = listFunction.map(item => item.name).indexOf('Auth')
          listFunction.splice(indexAuth, 1)
          const indexPerm = listFunction.map(item => item.name).indexOf('Perm')
          listFunction.splice(indexPerm, 1)
        }

        if (routerParam.upload) {
          listFunction.splice(1, 0, { name: 'Multer', class: Multer.array('img') })
        }

        if (routerParam.dependencies) {
          let temp = ''
          for (const dependentName of routerParam.dependencies) {
            if (Object.keys(this.routerList).includes(dependentName)) {
              const dependentId = this.routerList[dependentName].id
              temp += '/' + dependentName + '/:' + dependentId
            } else {
              logger.error(`Dependencia não encontrada: ${dependentName}`)
              throw new ApiError('Internal Server Error', 'dependentNotFound')
            }
          }
          pathName = temp + pathName
        }
        routeExpress[method](pathName, ...listFunction.map(item => item.class))
        logger.info(`${method.toUpperCase()} - [ ${functionName} ] ${pathName} ::: ${listFunction.map(item => item.name).join(' => ')}`)
      }
      logger.info('')
      logger.info('')
      this.app.use(routeExpress)
    }
  }
}

export default Router
