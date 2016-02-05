import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'
import {smartSync} from 'fl-server-utils'
import bcrypt from 'bcrypt-nodejs'

let Profile = null

const db_url = process.env.DATABASE_URL
if (!db_url) console.log('Missing process.env.DATABASE_URL')

export default class User extends Backbone.Model {
  url = `${db_url}/users`

  schema = () => _.extend({

    access_tokens: () => ['hasMany', require('fl-auth-server').AccessToken],
    // todo
    // refresh_tokens: () => ['hasMany', require('fl-auth-server').RefreshToken],

    profile: () => ['hasOne', Profile = require('./Profile')],

  }, require('../../shared/models/schemas/user'))

  static createHash(password) { return bcrypt.hashSync(password) }

  defaults() { return {created_at: moment.utc().toDate()} }

  onCreate(callback) {
    const profile = new Profile({user: this})
    profile.save(callback)
  }

  passwordIsValid(password) { return bcrypt.compareSync(password, this.get('password')) }
}

User.prototype.sync = smartSync(db_url, User)
