import _ from 'lodash'
import {createServerRenderer} from 'fl-react-utils'
import config from '../config'
import createStore from '../../shared/createStore'
import getRoutes from '../../shared/routes'

export default createServerRenderer({
  createStore,
  getRoutes,
  scripts: _.map(_.pick(require('../../webpack-assets.json'), ['shared.js', 'app']), entry => entry.js),
  omit: 'admin',
  config: _.pick(config, config.client_config_keys),
})
