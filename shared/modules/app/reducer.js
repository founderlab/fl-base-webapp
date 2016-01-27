import _ from 'lodash' // eslint-disable-line
import {fromJS} from 'immutable'
import {TYPES} from './actions'

const default_state = fromJS({
  pages_by_slug: {},
  static_page_links: {},
  settings: {},
})

export default function reducer(state=default_state, action={}) {

  switch (action.type) {
    case TYPES.APP_SETTINGS_LOAD + '_START':
    case TYPES.STATIC_PAGE_LOAD + '_START':
      return state.merge({loading: true, errors: null})

    case TYPES.APP_SETTINGS_LOAD + '_ERROR':
    case TYPES.STATIC_PAGE_LOAD + '_ERROR':
      return state.merge({loading: false, error: action.error || action.res.body.error})

    case TYPES.APP_SETTINGS_LOAD +'_SUCCESS':
      return state.merge({
        loading: false,
        loaded: true,
        errors: null,
        static_page_links: action.res.static_page_links,
        settings: _.omit(action.res, 'static_page_links'),
      })

    case TYPES.STATIC_PAGE_LOAD + '_SUCCESS':
      return state.mergeDeep({
        loading: false,
        errors: null,
        pages_by_slug: {[action.res.slug]: action.res},
      })

    default:
      return state
  }
}
