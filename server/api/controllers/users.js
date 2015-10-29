import _ from 'lodash'
import RestController from 'backbone-rest'
import {createAuthMiddleware} from 'fl-auth-server'

function canAccess(options, callback) {
  const {user, req} = options
  if (user.get('superuser')) return callback(null, true)
  if (req.params.id && (user.id === req.params.id)) return callback(null, true)
  callback(null, false)
}

export default class UsersController extends RestController {
  constructor(options) {
    super(options.app, _.defaults({
      model_type: require('fl-auth-server/lib/models/user'),
      route: '/api/users',
      auth: [...options.auth, createAuthMiddleware({canAccess})],
    }, options))
  }
}
