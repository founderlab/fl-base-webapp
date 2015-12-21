import _ from 'lodash' // eslint-disable-line
import {fromJS} from 'immutable'
import {createPaginationReducer} from 'fl-react-utils'
import {TYPES} from './actions'

const pagination = createPaginationReducer('USER')

const default_state = fromJS({
  by_id: {},
  pagination: pagination(),
})

export default function reducer(state=default_state, action={}) {

  switch (action.type) {
    case TYPES.USER_LOAD + '_START':
    case TYPES.USER_SAVE + '_START':
    case TYPES.USER_DELETE + '_START':
      return state.merge({loading: true, errors: null})

    case TYPES.USER_LOAD + '_ERROR':
    case TYPES.USER_SAVE + '_ERROR':
    case TYPES.USER_DELETE + '_ERROR':
      return state.merge({loading: false, error: action.error || action.res.body.error})

    case TYPES.USER_LOAD + '_SUCCESS':
      const ss = state.mergeDeep({
        loading: false,
        errors: null,
        by_id: action.by_id,
        pagination: pagination(state.pagination, action),
      })
      return ss

    case TYPES.USER_SAVE + '_SUCCESS':
      return state.mergeDeep({
        loading: false,
        errors: null,
        by_id: action.by_id,
      })

    case TYPES.USER_DELETE + '_SUCCESS':
      const by_id = (state.get('by_id') || {}).toJSON()
      delete by_id[action.deleted_id]
      return state.merge({
        loading: false,
        errors: null,
        by_id: by_id,
        pagination: pagination(state.pagination, action),
      })

    case TYPES.USER_COUNT + '_SUCCESS':
      return state.mergeDeep({
        pagination: pagination(state.pagination, action),
      })

    default:
      return state

  }
}
