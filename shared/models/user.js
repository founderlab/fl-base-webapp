import moment from 'moment'
import Backbone from 'backbone'

export default class User extends Backbone.Model {
  schema = () => ({
    name: 'String',
    email: 'String',
    created_at: 'Date',
  })
  defaults() { return {created_at: moment.utc().toDate()} }
}

User.prototype.urlRoot = '/api/users'
User.prototype.sync = require('backbone-http').sync(User)
