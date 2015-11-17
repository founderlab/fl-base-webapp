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

      case model_admin.action_type + '_LOAD_ONE_SUCCESS':
        let models = state.get('models')
        console.log('models are', models)
        const data = action.res.body
        models = models.set(data.id, data)
        console.log('modesl now', models)
        console.log(state.merge({
          loading: false,
          errors: null,
          models,
        }))
        return state.merge({
          loading: false,
          errors: null,
          models,
        })

      case model_admin.action_type + 'LOAD_SUCCESS':
        return state.merge({
          loading: false,
          errors: null,
          models: action.res.body,
        })

      case model_admin.action_type + '_SAVE_SUCCESS':
        const model = action.res && action.res.toJSON()
        return state.merge({
          model,
          loading: false,
          errors: null,
        })

      case model_admin.action_type + '_DEL_SUCCESS':
        if (state.models) {
          state.remove
        }
        return state.merge({
          model: null,
          loading: false,
          errors: null,
        })

      default:
        return state

    }
  }
}
