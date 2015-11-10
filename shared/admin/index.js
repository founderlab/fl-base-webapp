import _ from 'lodash'
import {combineReducers} from 'redux'

import {table} from './lib/naming'
import createActions from './create_actions'
import createReducer from './create_reducer'
import AdminRoute from './route'

const models = []
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

  if (!model_admin.path) model_admin.path = table(model_type)

  model_admin.actions = actions[model_admin.path] = createActions(model_admin)
  model_admin.reducer = reducers[model_admin.path] = createReducer(model_admin)

  model_admins.push(model_admin)
}

export default function configure(options) {

  _.forEach(options.models, model_type => {
    initModel(model_type)
  })

  reducer = combineReducers(reducers)

  console.log('actions, reducer, reducers, models')
  console.log(actions, reducer, reducers, models)
}

export {actions, reducer, reducers, model_admins, AdminRoute}
