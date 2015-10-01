import _ from 'lodash'
import RestController from 'backbone-rest'

export default class UsersController extends RestController {
  constructor(options) {
    super(options.app, _.defaults({
      model_type: require('fl-auth/server/models/user'),
      route: '/api/users',
    }, options))
  }
}
