import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'

export default class Content extends Backbone.Model {
  schema = () => _.extend({

  }, require('./schemas/content'))

  defaults() { return {created_at: moment.utc().toDate()} }
}

Content.prototype.urlRoot = '/api/contents'
Content.prototype.sync = require('backbone-http').sync(Content)
