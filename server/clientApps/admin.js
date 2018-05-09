// configure fl-auth before doing anything else
// to make sure the reducers exist before creating our store
import '../../shared/configureAdmin'

import _ from 'lodash'
import {createServerRenderer} from 'fl-react-server'
import config from '../config'
import createStore from '../../shared/createStore'
import getRoutes from '../../shared/routes'
import tags from './tags'

export default createServerRenderer({
  createStore,
  getRoutes,
  entries: ['shared', 'admin'],
  alwaysFetch: require('../../shared/modules/app/containers/App'),
  config: _.pick(config, config.clientConfigKeys),
  loadInitialState: function loadInitialState(req, callback) {
    const state = {auth: {csrf: req.csrfToken()}}
    const user = req.user
    if (user) {
      const links = {}
      _.forEach(user.links, link => links[link.id] = link)
      state.auth.links = links
      state.auth.user = {id: user.id}
    }

    // Immutable.fromJS has a bug with objects flagged as anonymous in node 6
    // https://github.com/facebook/immutable-js/issues/1001
    callback(null, JSON.parse(JSON.stringify(state)))
    // callback(null, state)
  },
  preScriptTags: tags.preScriptTags,
})
