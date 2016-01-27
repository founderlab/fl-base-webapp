import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'
import bcrypt from 'bcrypt-nodejs'

const db_url = process.env.DATABASE_URL
if (!db_url) console.log('Missing process.env.DATABASE_URL')

export default class User extends Backbone.Model {
  url = `${db_url}/users`

  schema = () => _.extend({
    access_tokens: () => ['hasMany', require('fl-auth-server').AccessToken],
    // todo
    // refresh_tokens: () => ['hasMany', require('fl-auth-server').RefreshToken],

    profile: () => ['hasOne', require('./Profile')],
    school: () => ['belongsTo', require('./School'), {as: 'students'}],

  }, require('../../shared/models/schemas/User'))

  static createHash(password) { return bcrypt.hashSync(password) }

  defaults() { return {created_at: moment.utc().toDate()} }

  passwordIsValid(password) { return bcrypt.compareSync(password, this.get('password')) }
}

User.prototype.sync = require('backbone-mongo').sync(User)
