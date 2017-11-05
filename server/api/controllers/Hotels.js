import _ from 'lodash' // eslint-disable-line
import RestController from 'fl-backbone-rest'
import {createAuthMiddleware} from 'fl-auth-server'
import {JSONUtils} from 'backbone-orm'
import Profile from '../../models/Profile'
import schema from '../../../shared/models/schemas/hotel'

const ADMIN_ONLY_FIELDS = ['parentHotelName']

export function canAccess(options, callback) {
  const {user, req} = options
  if (user && user.admin) return callback(null, true)

  const query = JSONUtils.parseQuery(req.query)
  if (query.$include) return callback(null, false, 'No $include')

  if (req.method === 'GET') {
    return callback(null, true)
  }

  // Allow editing for the owner of the profile
  if (user && req.method === 'PUT') {
    req.body = _.omit(req.body, ADMIN_ONLY_FIELDS)
    return Profile.exists({user_id: user.id, active: true, hotel_id: req.params.id}, (err, exists) => {
      callback(err, exists, 'Your profile must be active to edit your associated business.')
    })
  }

  // Disallow, post, delete
  callback(null, false)
}

export default class HotelsController extends RestController {
  constructor(options) {
    super(options.app, _.defaults({
      model_type: require('../../models/Hotel'),
      route: '/api/hotels',
      auth: [...options.auth, createAuthMiddleware({canAccess})],
      whitelist: {
        update: ['id'].concat(_.keys(schema)),
      },
    }, options))
    this.cache.cascade = ['im_/api/profiles']
  }
}
