import {PREFIX} from './action_types'
import {upper} from './lib/naming'

export default function createModelActions(model_admin) {
  const MODEL = upper(model_admin.model_type)
  const type = name => PREFIX + MODEL + name.toUpperCase()

  return {
    load: (query, callback) => {
      return {
        type: type('load'),
        request: model_admin.model_type.get(query),
        callback,
      }
    },
  }
}
