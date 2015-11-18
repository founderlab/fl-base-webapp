import _ from 'lodash'
import path from 'path'

const SERVER_PATH = '../models/'

export default function loadModel(model_name) {
  if (!_.isString(model_name)) return model_name
  if (model_name === 'user') return require('fl-auth-server/lib/models/user')
  return require(path.join(SERVER_PATH, model_name))
}
