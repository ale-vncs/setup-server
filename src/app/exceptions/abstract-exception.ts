import { ResultData } from '@typings/result'

abstract class AbstractException<T> {
  abstract exception (error: T): ResultData
}

export default AbstractException
