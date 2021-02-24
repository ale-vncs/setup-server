import { RouterConfig } from './index'

export default <RouterConfig> {
  id: 'statusId',
  routes: [
    { method: 'get', path: '', function: 'getStatus', notAuth: true }
  ]
}
