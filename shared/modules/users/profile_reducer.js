import _ from 'lodash' // eslint-disable-line
import {fromJS} from 'immutable'
import {TYPES} from './profile_actions'

const default_state = fromJS({
  active: null,
  loading: false,
  errors: null,
  by_id: {},
})

export default function reducer(state=default_state, action={}) {

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
        by_id: action.by_id,
      }
      if (action.active) to_merge.active = action.models[0]
      const ss = state.mergeDeep(to_merge)
      return ss

    case TYPES.PROFILE_SAVE + '_SUCCESS':
      console.log('profile save reducing:', action)
      const {profile, location} = action.res
      const ss1 = state.mergeDeep({
        loading: false,
        errors: null,
        by_id: {[profile.id]: _.extend(profile, {location})},
      })
      return ss1

    default:
      return state
  }
}
