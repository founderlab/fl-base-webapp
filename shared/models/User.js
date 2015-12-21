import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'

export default class User extends Backbone.Model {
  schema = () => _.extend({

    school: () => ['belongsTo', require('./School'), {as: 'students'}],

  }, require('./schemas/user'))

  defaults() { return {created_at: moment.utc().toDate()} }
}

User.prototype.urlRoot = '/api/users'
User.prototype.sync = require('backbone-http').sync(User)
