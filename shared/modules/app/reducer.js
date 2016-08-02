import _ from 'lodash' // eslint-disable-line
import {fromJS} from 'immutable'
import {TYPES} from './actions'

const defaultState = fromJS({
  pagesBySlug: {},
  staticPageLinks: {},
  settings: {},
})

export default function reducer(state=defaultState, action={}) {

  switch (action.type) {
    case TYPES.APP_SETTINGS_LOAD + '_START':
    case TYPES.STATIC_PAGE_LOAD + '_START':
      return state.merge({loading: true, errors: {}})

    case TYPES.APP_SETTINGS_LOAD + '_ERROR':
    case TYPES.STATIC_PAGE_LOAD + '_ERROR':
      return state.merge({loading: false, errors: {load: action.error || action.res.body.error}})

    case TYPES.APP_SETTINGS_LOAD +'_SUCCESS':
      let toMerge = {}
      if (action.model) {
        const {staticPageLinks, ...rest} = action.model
        toMerge = {
          staticPageLinks,
          settings: rest,
          errors: {},
        }
      }
      else {
        toMerge = {errors: {load: 'No app settings model was found'}}
      }
      return state.merge({
        loading: false,
        loaded: true,
        ...toMerge,
      })

    case TYPES.STATIC_PAGE_LOAD + '_SUCCESS':
      return state.mergeDeep({
        loading: false,
        errors: {},
        pagesBySlug: {[action.res.slug]: action.res},
      })

    default:
      return state
  }
}
