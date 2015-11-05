
import _ from 'lodash'
import inflection from 'inflection'

import name from './lib/name'
import createActions from './create_actions'
import createReducer from './create_reducer'

const models = []
const actions = {}
const reducers = {}
let reducer

function initModel(model) {
  const model_redux = {actions: createActions(model), reducer: createReducer(model)}
  const us_name = inflection.underscore(name(model_class))
  actions[us_name] = model_redux.actions
  reducers[us_name] = model_redux.reducers
  return model_redux
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
