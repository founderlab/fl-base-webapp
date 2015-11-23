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

function createModelAdmin(options, model_descriptor) {
  const model_admin = {}
  if (options.isAModel(model_descriptor)) model_admin.model_type = model_descriptor
  else if (_.isObject(model_descriptor)) _.merge(model_admin, model_descriptor)
  else throw new Error('[fl-admin] configure: Unrecognized model descriptor - provide a string or model or model_admin')

  const {model_type} = model_admin

  const defaults = {
    name: model_type.model_name,
    display: model => model.name || model.id,
    path: table(model_type),
    plural: plural(model_type),
    action_type: `${ACTION_PREFIX}${upper(model_type)}`,
    fields: {},
  }

  _.defaults(model_admin, defaults)

  const model_fields = (model_type.schema? model_type.schema('schema').fields : model_type.fields) || {}
  _.forEach(model_fields, (model_field, name) => {
    const admin_field = model_admin.fields[name] = model_admin.fields[name] || {}
    _.defaults(admin_field, model_field)
    admin_field.name = admin_field.name || name
  })

  model_admin.actions = actions[model_admin.path] = createActions(model_admin)
  model_admin.reducer = reducers[model_admin.path] = createReducer(model_admin)

  return model_admin
}

export default function configure(_options) {
  const options = _.merge(defaults, _options)

  _.forEach(options.models, model_descriptor => {
    model_admins.push(createModelAdmin(options, model_descriptor))
  })

  reducer = combineReducers(reducers)
}

export {actions, reducer, model_admins, AdminRoute}
