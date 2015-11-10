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

function isAModel(model_type) {
  return !model_type.sync
}

function initModel(model_type) {
  let model_admin = model_type

  if (isAModel(model_type)) {
    model_admin = {
      model_type,
    }
  }

  if (!model_admin.name) model_admin.name = model_type.name
  if (!model_admin.path) model_admin.path = table(model_type)
  if (!model_admin.plural) model_admin.plural = plural(model_type)
  if (!model_admin.action_type) model_admin.action_type = `${ACTION_PREFIX}${upper(model_type)}`

  model_admin.actions = actions[model_admin.path] = createActions(model_admin)
  model_admin.reducer = reducers[model_admin.path] = createReducer(model_admin)

  model_admins.push(model_admin)
}

export default function configure(options) {

  _.forEach(options.models, model_type => {
    initModel(model_type)
  })

  reducer = combineReducers(reducers)

}

export {actions, reducer, model_admins, AdminRoute}
