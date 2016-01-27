import _ from 'lodash'
import {createServerRenderer} from 'fl-server-utils'
import config from '../config'
import createStore from '../../shared/createStore'
import getRoutes from '../../shared/routes'

export default createServerRenderer({
  createStore,
  getRoutes,
  omit: 'admin',
  always_fetch: require('../../shared/modules/app/containers/App'),
  config: _.pick(config, config.client_config_keys),
})
