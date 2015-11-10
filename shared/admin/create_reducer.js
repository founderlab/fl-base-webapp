import Immutable from 'immutable'
import {PREFIX} from './action_types'
import {upper} from './lib/naming'

const default_state = new Immutable.Map()

export default function createReducer(model_admin) {
  const MODEL = upper(model_admin.model_type)

  return function reducer(state=default_state, action={}) {

    switch (action.type) {
      case PREFIX + MODEL + '_LOAD_START':
        return state.merge({loading: true, errors: null})

      case PREFIX + MODEL + '_LOAD_ERROR':
        return state.merge({loading: false, error: action.error || action.res.body.error})

      case PREFIX + MODEL + '_LOAD_SUCCESS':
        return state.merge({
          loading: false,
          errors: null,
          model: action.res.body,
        })

      default:
        return state

    }
  }
}
