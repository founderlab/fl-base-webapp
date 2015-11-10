import moment from 'moment'
import Backbone from 'backbone'

export default class Group extends Backbone.Model {
  schema = () => ({
    name: 'String',
    description: 'String',
    created_at: 'Date',
  })
  defaults() { return {created_at: moment.utc().toDate()} }
}

Group.prototype.urlRoot = '/api/groups'
Group.prototype.sync = require('backbone-http').sync(Group)
