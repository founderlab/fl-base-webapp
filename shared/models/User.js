import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'

export default class User extends Backbone.Model {
  schema = () => _.extend({

  }, require('./schemas/user'))

  defaults() { return {createdDate: moment.utc().toDate()} }
}

User.prototype.urlRoot = '/api/users'
User.prototype.sync = require('backbone-http').sync(User)
