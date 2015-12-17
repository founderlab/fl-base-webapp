import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'

export default class User extends Backbone.Model {
  schema = () => _.extend({

    // Relations used by organisation representatives
    opportunities: () => ['hasMany', require('./opportunity'), {as: 'poster'}],
    organisation: () => ['belongsTo', require('./organisation'), {as: 'representatives'}],

    // Relations used by students
    applications: () => ['hasMany', require('./application'), {as: 'student'}],
    engagements: () => ['hasMany', require('./engagement'), {as: 'student'}],
    school: () => ['belongsTo', require('./school'), {as: 'students'}],

  }, require('./schemas/user'))

  defaults() { return {created_at: moment.utc().toDate()} }
}

User.prototype.urlRoot = '/api/users'
User.prototype.sync = require('backbone-http').sync(User)
