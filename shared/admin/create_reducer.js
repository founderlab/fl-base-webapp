import Immutable from 'immutable'

export default function createReducer(model_admin) {
  const default_state = new Immutable.Map()

  return function reducer(state=default_state, action={}) {

    switch (action.type) {
      case model_admin.action_type + '_LOAD_START':
        return state.merge({loading: true, errors: null})

      case model_admin.action_type + '_LOAD_ERROR':
        return state.merge({loading: false, error: action.error || action.res.body.error})

      case model_admin.action_type + '_LOAD_SUCCESS':
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
