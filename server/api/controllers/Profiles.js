import _ from 'lodash' // eslint-disable-line
import RestController from 'fl-backbone-rest'
import {JSONUtils} from 'backbone-orm'
import {createAuthMiddleware} from 'fl-auth-server'
import Profile from '../../models/Profile'

export function canAccess(options, callback) {
  const {user, req} = options
  if (!user) return callback(null, false)
  if (user.admin) return callback(null, true)

  const query = JSONUtils.parseQuery(req.query)
  if (query.$include) return callback(null, false, 'No $include')

  // Allow access for the owner of the profile
  if (req.method === 'GET' && query.user_id === user.id) {
    return callback(null, true)
  }

  // Allow editing for the owner of the profile
  if (req.method === 'PUT') {
    return Profile.exists({id: req.params.id, user_id: user.id}, callback)
  }

  callback(null, false)
}

export default class ProfilesController extends RestController {
  constructor(options) {
    super(options.app, _.defaults({
      model_type: Profile,
      route: '/api/profiles',
      auth: [...options.auth, createAuthMiddleware({canAccess})],
      templates: {
        detail: require('../templates/profiles/detail'),
      },
      default_template: 'detail',
    }, options))
  }
}
