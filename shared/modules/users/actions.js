import _ from 'lodash' // eslint-disable-line
import User from '../../models/User'

export const TYPES = {
  USER_COUNT: 'USER_COUNT',
  USER_LOAD: 'USER_LOAD',
  USER_SAVE: 'USER_SAVE',
  USER_DELETE: 'USER_DELETE',
}

export function apply(data, callback) {
  return {
    callback,
  }
}

export function count(query, callback) {
  return {
    type: TYPES.USER_COUNT,
    request: callback => User.count(query, callback),
    callback,
  }
}

export function load(query, callback) {
  return {
    type: TYPES.USER_LOAD,
    request: User.cursor(query),
    callback,
  }
}

export function loadPage(page, query, callback) {
  return {
    page,
    type: TYPES.USER_LOAD,
    request: User.cursor(query),
    callback,
  }
}

export function save(data, callback) {
  const model = new User(data)
  return {
    type: TYPES.USER_SAVE,
    request: model.save.bind(model),
    callback,
  }
}

export function del(data, callback) {
  const model = new User(data)
  return {
    type: TYPES.USER_DELETE,
    request: model.destroy.bind(model),
    deleted_model_id: model.id,
    callback,
  }
}
