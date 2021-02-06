import { NextFunction, Request, Response } from 'express'
import { EmployeeActionEnum } from '@enums/employee-action'
import AbstractMiddleware from '@src/app/middlewares/abstract-middleware'
import { logger } from '@logger'

class Permissions extends AbstractMiddleware {
  constructor (private permissionList?: EmployeeActionEnum[]) {
    super()
  }

  checkPermission (req: Request, res: Response, next: NextFunction): void {
    if (this.permissionList && this.permissionList.length) {
      const parsePermissionName = []
      for (const perm of this.permissionList) {
        parsePermissionName.push(EmployeeActionEnum[perm])
      }

      logger.info(`Lista de permissões da rota: ${JSON.stringify(parsePermissionName)}`)
      logger.info('Verificando permissões de funcionários...')
      const actions = res.locals.employee_actions

      if (actions.includes(EmployeeActionEnum.ALL)) {
        logger.info('Funcionário com todas as permissões')
        return next()
      }

      const havePermission = this.permissionList.some(perm => actions.includes(perm))
      if (!havePermission) {
        logger.error('Funcionário não tem permissão de acesso')
        return this.result(res, {
          status: 'Forbidden',
          msg: 'userNotAuthorization'
        })
      }
      logger.info('Funcionário permitido!!!')
    } else {
      logger.info('Está rota não possui permissões')
    }
    next()
  }
}

export default Permissions
