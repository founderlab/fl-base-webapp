import Immutable from 'immutable'

export default function createReducer(model_admin) {
  const default_state = new Immutable.Map()

  return function reducer(state=default_state, action={}) {

    switch (action.type) {
      case model_admin.action_type + '_LOAD_START':
      case model_admin.action_type + '_SAVE_START':
      case model_admin.action_type + '_DEL_START':
        return state.merge({loading: true, errors: null})

      case model_admin.action_type + '_LOAD_ERROR':
      case model_admin.action_type + '_SAVE_ERROR':
      case model_admin.action_type + '_DEL_ERROR':
        return state.merge({loading: false, error: action.error || action.res.body.error})

      // case model_admin.action_type + '_LOAD_ONE_SUCCESS':
      //   let models = state.get('models')
      //   const data = action.res.body
      //   models = models.set(data.id, data)
      //   return state.merge({
      //     loading: false,
      //     errors: null,
      //     models,
      //   })

      case model_admin.action_type + '_LOAD_SUCCESS':
        const ss = state.merge({
          loading: false,
          errors: null,
          by_id: action.by_id,
        })
        return ss

      case model_admin.action_type + '_SAVE_SUCCESS':
        return state.merge({
          loading: false,
          errors: null,
          by_id: action.by_id,
        })

//todo: rm model
      case model_admin.action_type + '_DEL_SUCCESS':
        return state.merge({
          loading: false,
          errors: null,
          by_id: action.by_id,
        })

      default:
        return state

    }
  }
}
