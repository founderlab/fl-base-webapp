import _ from 'lodash'
import RestController from 'backbone-rest'
import {createAuthMiddleware} from 'fl-auth-server'

function canAccess(options, callback) {
  const {user, req} = options
  if (user.admin || user.get('admin')) return callback(null, true)
  if (req.params.id && (user.id === req.params.id)) return callback(null, true)
  callback(null, false)
}

export default class UsersController extends RestController {
  constructor(options) {
    super(options.app, _.defaults({
      model_type: require('fl-auth-server/lib/models/User'),
      route: '/api/users',
      auth: [...options.auth, createAuthMiddleware({canAccess})],
      whitelist: {
        index: ['id', 'email'],
        show: ['id', 'email'],
      },
    }, options))
  }
}
