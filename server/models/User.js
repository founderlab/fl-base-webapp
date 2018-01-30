import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'
import {smartSync} from 'fl-server-utils'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'
import EventEmitter from 'events'
import {wrapById} from '../cache/users'

let Profile

const LAST_ACTIVE_UPDATE_INTERVAL = 1000 * 60 * 60 // 1 minute

const dbUrl = process.env.DATABASE_URL
if (!dbUrl) console.log('Missing process.env.DATABASE_URL')

export default class User extends Backbone.Model {
  url = `${dbUrl}/users`

  schema = () => _.extend({
    profile: () => ['hasOne', Profile = require('./Profile')],
  }, require('../../shared/models/schemas/user'))

  static events = new EventEmitter()

  static createHash(password) { return bcrypt.hashSync(password) }

  defaults() { return {createdDate: moment.utc().toDate()} }

  onCreate(callback) {
    const profile = new Profile({
      user: this,
      firstName: '',
      lastName: '',
      emailMd5: crypto.createHash('md5').update(this.get('email')).digest('hex'),
    })

    profile.save(err => {
      if (err) return callback(err)
      const result = {user: this.toJSON(), profile: profile.toJSON()}
      callback(null, result)
    })
  }

  static onFacebookLogin(user, facebookProfile, isNew, callback) {
    Profile.findOne({user_id: user.id}, (err, _profile) => {
      if (err) return callback(err)
      const profile = _profile || new Profile({user, name: facebookProfile.name})
      const update = _.omit(facebookProfile, 'id')
      profile.save(update, callback)
    })
  }

  static deserializeUser(id, callback) {
    if (process.env.VERBOSE) console.time(`deserializeUser_${id}`)
    const getUser = callback => User._deserializeUser(id, callback)
    const done = (err, user) => {
      if (process.env.VERBOSE) console.timeEnd(`deserializeUser_${id}`)
      callback(err, user)
    }
    return wrapById(id, getUser, done)
  }

  static _deserializeUser(id, callback) {
    User.cursor({id, $one: true}).toJSON((err, user) => {
      if (err || !user) return callback(err, null)
      const now = new Date()

      if (!user.lastActiveDate || (now.getTime() - user.lastActiveDate > LAST_ACTIVE_UPDATE_INTERVAL)) {
        const userModel = new User(user)
        return userModel.save({lastActiveDate: now}, err => {
          if (err) return callback(err, user)

          Profile.findOne({user_id: user.id}, (err, profile) => {
            if (err || !profile) return callback(err, user)
            profile.save({lastActiveDate: now}, err => {
              callback(err, user)
            })
          })
        })
      }

      callback(err, user)
    })
  }

  static passwordIsValidForId(id, password, callback) {
    User.cursor({id, $one: true}).values('password').toJSON((err, passwordHash) => {
      if (err) return callback(err)
      bcrypt.compare(password, passwordHash, callback)
    })
  }

  passwordIsValid(password) { return bcrypt.compareSync(password, this.get('password')) }
}

User.prototype.sync = smartSync(dbUrl, User)
