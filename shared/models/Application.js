import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'

export default class Application extends Backbone.Model {
  schema = () => _.extend({

  }, require('./schemas/application'))

  defaults() { return {created_at: moment.utc().toDate()} }
}

Application.prototype.urlRoot = '/api/applications'
Application.prototype.sync = require('backbone-http').sync(Application)
