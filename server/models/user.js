import moment from 'moment'
import Backbone from 'backbone'
import bcrypt from 'bcrypt-nodejs'

if (!process.env.DATABASE_URL) console.trace('Missing process.env.DATABASE_URL')

export default class User extends Backbone.Model {
  url = `${process.env.DATABASE_URL}/users`

  defaults() { return {created_at: moment.utc().toDate()} }

  passwordIsValid(password) { return bcrypt.compareSync(password, this.get('password')) }

  static createHash(password) { return bcrypt.hashSync(password) }

}

User.prototype.sync = require('backbone-mongo').sync(User)
