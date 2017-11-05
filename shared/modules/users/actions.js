import _ from 'lodash' // eslint-disable-line
import User from '../../models/User'

export const TYPES = {
  USER_UPDATE: 'USER_UPDATE',
}

export function saveUser(user, callback) {
  const model = new User(user)
  return {
    type: TYPES.USER_UPDATE,
    request: model.save.bind(model),
    callback,
  }
}
