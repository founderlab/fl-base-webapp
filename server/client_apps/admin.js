// configure fl-auth before doing anything else
// to make sure the reducers exist before creating our store
import '../../shared/configureAdmin'

import _ from 'lodash'
import {createServerRenderer} from 'fl-react-utils'
import config from '../config'
import createStore from '../../shared/createStore'
import getRoutes from '../../shared/routes'

export default createServerRenderer({
  createStore,
  getRoutes,
  scripts: _.map(_.pick(require('../../webpack-assets.json'), ['shared.js', 'admin']), entry => entry.js),
  config: _.pick(config, config.client_config_keys),
})
