import _ from 'lodash'
import {combineReducers} from 'redux'

import {table, plural, upper} from './lib/naming'
import createActions from './create_actions'
import createReducer from './create_reducer'
import AdminRoute from './route'

const ACTION_PREFIX = 'FL_ADMIN_'
const model_admins = []
const actions = {}
const reducers = {}
let reducer

const defaults = {
  isAModel: (model_type) => !!model_type.schema,
}

function initModel(options, model_descriptor) {
  const model_admin = {}
  if (_.isString(model_descriptor) || options.isAModel(model_descriptor)) model_admin.model_type = model_descriptor
  else if (_.isObject(model_descriptor)) _.merge(model_admin, model_descriptor)
  else throw new Error('[fl-admin] configure: Unrecognized model descriptor - provide a string or model or model_admin')

  if (options.loadModel && _.isString(model_admin.model_type)) model_admin.model_type = options.loadModel(model_admin.model_type)

  if (!model_admin.name) model_admin.name = model_admin.model_type.model_name
  if (!model_admin.path) model_admin.path = table(model_admin.model_type)
  if (!model_admin.plural) model_admin.plural = plural(model_admin.model_type)
  if (!model_admin.action_type) model_admin.action_type = `${ACTION_PREFIX}${upper(model_admin.model_type)}`

  model_admin.actions = actions[model_admin.path] = createActions(model_admin)
  model_admin.reducer = reducers[model_admin.path] = createReducer(model_admin)
  model_admins.push(model_admin)
}

export default function configure(_options) {
  const options = _.merge(defaults, _options)

  _.forEach(options.models, model_descriptor => {
    initModel(options, model_descriptor)
  })
  reducer = combineReducers(reducers)
}

export {actions, reducer, model_admins, AdminRoute}
