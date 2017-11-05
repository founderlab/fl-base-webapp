import _ from 'lodash'
import RestController from 'fl-backbone-rest'
import {createAuthMiddleware} from 'fl-auth-server'
import User from '../../models/User'
import schema from '../../../shared/models/schemas/user'

function canAccess(options, callback) {
  const {user, req} = options
  if (!user) return callback(null, false)
  if (user.admin) return callback(null, true)

  const query = JSONUtils.parseQuery(req.query)
  if (query.$include) return callback(null, false, 'No $include')
  if (query.$template === 'admin') return callback(null, false, 'This template is only for admins')

  const id = req.params.id
  if (req.method === 'PUT') {
    return User.passwordIsValidForId(id, req.body.currentPassword, (err, valid) => {
      if (err) return callback(err)
      if (!valid) return callback(null, false, `The current password you entered isn't correct`)
      callback(null, true)
    })
  }

  // if (id && (user.id == id)) return callback(null, true)
  callback(null, false)
}

export default class UsersController extends RestController {
  constructor(options) {
    super(options.app, _.defaults({
      model_type: User,
      route: '/api/users',
      auth: [...options.auth, createAuthMiddleware({canAccess})],
      whitelist: {
        index: ['id', ..._.without(_.keys(schema), 'password', 'emailConfirmationToken', 'resetToken', 'resetTokenCreatedDate')],
        show: ['id', ..._.without(_.keys(schema), 'password', 'emailConfirmationToken', 'resetToken', 'resetTokenCreatedDate')],
        update: ['id', 'email', 'admin', 'currentPassword', 'password'],
      },
      templates: {
        show: {$select: ['id', 'email', 'admin']},
        admin: require('../templates/users/admin'),
      },
      default_template: 'show',
    }, options))

    this.app.get('/oauth/redirect', this.redirect)
  }

  create(req, res) {
    if (!req.body.password) return res.send(402, {error: 'You must supply a password'})
    if (!req.body.email) return res.send(402, {error: 'You must supply an email'})

    req.body.password = User.createHash(req.body.password)
    const user = new User(req.body)
    user.save(user.toJSON(), err => {
      if (err) return this.sendError(res, err)
      user.onCreate(err => {
        if (err) return this.sendError(res, err)
        res.json(_.omit(user.toJSON(), '_rev', 'password'))
      })
    })
  }

  update(req, res) {
    delete req.body.currentPassword
    if (req.body.password) {
      req.body.password = User.createHash(req.body.password)
    }
    super.update(req, res)
  }

  redirect = (req, res) => {
    if (req.session.returnTo) {
      return res.redirect(req.session.returnTo)
    }
    res.redirect('/')
  }
}
