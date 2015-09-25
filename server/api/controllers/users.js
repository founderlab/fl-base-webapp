import _ from 'lodash'
import RestController from 'backbone-rest'

export default class UsersController extends RestController {
  constructor(options) {
    super(options.app, _.defaults({
      model_type: require('../../models/user'),
      route: '/api/users',
    }, options))
  }
}
