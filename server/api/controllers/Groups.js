import _ from 'lodash'
import RestController from 'backbone-rest'
import {createAuthMiddleware} from 'fl-auth-server'

function canAccess(options, callback) {
  callback(null, true)
  // const {user, req} = options
  // if (user.get('admin')) return callback(null, true)
  // if (req.params.id && (user.id === req.params.id)) return callback(null, true)
  // callback(null, false)
}

export default class GroupsController extends RestController {
  constructor(options) {
    super(options.app, _.defaults({
      model_type: require('../../models/Group'),
      route: '/api/groups',
      auth: [...options.auth, createAuthMiddleware({canAccess})],
      whitelist: {
        // update: ['name', 'description'],
        // index: ['id', 'name', 'description'],
        // show: ['id', 'name', 'description'],
      },
    }, options))
  }

}
