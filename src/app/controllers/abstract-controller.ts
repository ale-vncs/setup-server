import { Response } from 'express'
import Constants from '../../config/constants'
import result from '@utils/result'
import { ResultData } from '@typings/result'

abstract class AbstractController {
  protected Constants = Constants

  protected result (res: Response, data: ResultData): void {
    result(res, data)
  }
}

export default AbstractController
