import _ from 'lodash'
import inflection from 'inflection'
import {combineReducers} from 'redux'

import name from './lib/name'
import createActions from './create_actions'
import createReducer from './create_reducer'

const models = []
const actions = {}
const reducers = {}
let reducer

function initModel(model_class) {
  const us_name = inflection.underscore(name(model_class))
  actions[us_name] = createActions(model_class)
  reducers[us_name] = createReducer(model_class)
  return {actions: actions[us_name], reducer: reducers[us_name]}
}

export default function configure(options) {

  _.forEach(options.models, (model_class) => {
    initModel(model_class)
  })

  reducer = combineReducers(reducers)

  console.log('actions, reducers')
  console.log(actions, reducers)
}

export {actions, reducer, models}
