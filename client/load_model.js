import _ from 'lodash'
import path from 'path'

const CLIENT_PATH = '../shared/models/'

export default function loadModel(model_name) {
  if (!_.isString(model_name)) return model_name
  return require(path.join(CLIENT_PATH, model_name))
}
