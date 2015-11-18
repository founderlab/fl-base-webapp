import Immutable from 'immutable'

export default function createReducer(model_admin) {
  const default_state = new Immutable.Map({by_id: {}})

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
        const ss = state.mergeDeep({
          loading: false,
          errors: null,
          by_id: action.by_id,
        })
        return ss

      case model_admin.action_type + '_SAVE_SUCCESS':
        return state.mergeDeep({
          loading: false,
          errors: null,
          by_id: action.by_id,
        })

      case model_admin.action_type + '_DEL_SUCCESS':
        const by_id = (state.get('by_id') || {}).toJSON()
        delete by_id[action.model_id]
        return state.merge({
          loading: false,
          errors: null,
          by_id: by_id,
        })

      default:
        return state

    }
  }
}
