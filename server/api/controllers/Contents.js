import _ from 'lodash' // eslint-disable-line
import RestController from 'backbone-rest'
import {createAuthMiddleware} from 'fl-auth-server'

function canAccess(options, callback) {
  const {user, req} = options
  callback(null, true)
}

export default class ContentsController extends RestController {
  constructor(options) {
    super(options.app, _.defaults({
      model_type: require('../../models/content'),
      route: '/api/contents',
      auth: [...options.auth, createAuthMiddleware({canAccess})],
      whitelist: {

      },
    }, options))
  }
}
