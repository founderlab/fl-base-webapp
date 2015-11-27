import moment from 'moment'
import Backbone from 'backbone'

export default class Target extends Backbone.Model {
  schema = () => ({
    name: 'String',
    description: 'String',
    created_at: 'Date',
    is_this_thing_on: 'Boolean',
    groups: () => ['hasMany', require('./group')],
  })
  defaults() { return {created_at: moment.utc().toDate()} }
}

Target.prototype.urlRoot = '/api/targets'
Target.prototype.sync = require('backbone-http').sync(Target)
