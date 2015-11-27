import '../../shared/configure_admin'
import {createServerRenderer} from 'fl-react-utils'
import config from '../config'
import createStore from '../../shared/create_store'
import getRoutes from '../../shared/routes'

export default createServerRenderer({
  createStore,
  getRoutes,
  scripts: ['shared.js', 'admin.js'],
  config: {url: config.url},
})
