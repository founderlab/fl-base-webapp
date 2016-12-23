import _ from 'lodash' // eslint-disable-line
import RestController from 'fl-backbone-rest'
import {createAuthMiddleware} from 'fl-auth-server'
import User from '../../models/User'

function canAccess(options, callback) {
  const {user} = options
  if (!user) return callback(null, false)
  if (user && (user.admin)) return callback(null, true)
  callback(null, false)
}

export default class UsersController extends RestController {
  constructor(options) {
    super(options.app, _.defaults({
      model_type: User,
      route: '/api/users',
      auth: [...options.auth, createAuthMiddleware({canAccess})],
      whitelist: {
        index: ['id', 'email', 'admin'],
        show: ['id', 'email', 'admin'],
        update: ['id', 'email', 'admin'],
      },
      templates: {
        show: {$select: ['id', 'email', 'admin']},
      },
      default_template: 'show',
    }, options))
  }

  create(req, res) {
    if (!req.body.password) return res.send(402, {error: 'You must supply a password'})
    if (!req.body.email) return res.send(402, {error: 'You must supply an email'})

    req.body.password = User.createHash(req.body.password)
    const user = new User(req.body)
    user.save(err => {
      if (err) return this.sendError(res, err)
      user.onCreate(err => {
        if (err) return this.sendError(res, err)
        res.json(_.omit(user.toJSON(), '_rev', 'password'))
      })
    })
  }

  update(req, res) {
    if (req.body.password) {
      req.body.password = User.createHash(req.body.password)
    }
    super(req, res)
  }
}
