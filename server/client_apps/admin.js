// configure fl-auth before doing anything else
// to make sure the reducers exist before creating our store
import '../../shared/configureAdmin'

import _ from 'lodash'
import {createServerRenderer} from 'fl-server-utils'
import config from '../config'
import createStore from '../../shared/createStore'
import getRoutes from '../../shared/routes'

export default createServerRenderer({
  createStore,
  getRoutes,
  entries: ['shared', 'admin'],
  always_fetch: require('../../shared/modules/app/containers/App'),
  config: _.pick(config, config.client_config_keys),
})
