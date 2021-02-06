import { RouterConfig } from './index'

export default <RouterConfig> {
  id: 'playerId',
  routes: [
    { method: 'get', path: '', function: 'getPlayer' },
    { method: 'post', path: '', function: 'createPlayer', notAuth: true }
  ]
}
