import _ from 'lodash' // eslint-disable-line
import {fromJS} from 'immutable'
import {TYPES} from './profileActions'

const defaultState = fromJS({
  active: null,
  loading: false,
  errors: null,
  models: {},
})

export default function reducer(state=defaultState, action={}) {

  switch (action.type) {
    case TYPES.PROFILE_LOAD + '_START':
    case TYPES.PROFILE_SAVE + '_START':
      return state.merge({loading: true, errors: null})

    case TYPES.PROFILE_LOAD + '_ERROR':
    case TYPES.PROFILE_SAVE + '_ERROR':
      return state.merge({loading: false, error: action.error || action.res.body.error})

    case TYPES.PROFILE_LOAD +'_SUCCESS':
      const to_merge = {
        loading: false,
        errors: null,
        models: action.models,
      }
      if (action.active) to_merge.active = action.models[0]
      const ss = state.mergeDeep(to_merge)
      return ss

    case TYPES.PROFILE_SAVE + '_SUCCESS':
      const {profile, location} = action.res
      return state.mergeDeep({
        loading: false,
        errors: null,
        models: {[profile.id]: _.extend(profile, {location})},
      })

    default:
      return state
  }
}
