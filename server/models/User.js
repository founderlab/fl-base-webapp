import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'
import {smartSync} from 'fl-server-utils'
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

    // Relations used by organisation representatives
    opportunities: () => ['hasMany', require('./Opportunity'), {as: 'poster'}],
    organisation: () => ['belongsTo', require('./Organisation'), {as: 'representatives'}],

    // Relations used by applicants
    applications: () => ['hasMany', require('./Application'), {as: 'applicant'}],
    engagements: () => ['hasMany', require('./Engagement'), {as: 'applicant'}],
    school: () => ['belongsTo', require('./School'), {as: 'applicants'}],

  }, require('../../shared/models/schemas/user'))

  static createHash(password) { return bcrypt.hashSync(password) }

  defaults() { return {created_at: moment.utc().toDate()} }

  passwordIsValid(password) { return bcrypt.compareSync(password, this.get('password')) }
}

User.prototype.sync = smartSync(db_url, User)
