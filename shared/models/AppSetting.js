import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'

export default class AppSetting extends Backbone.Model {
  schema = () => _.extend({

  }, require('./schemas/app_settings'))

  defaults() { return {created_at: moment.utc().toDate()} }
}

AppSetting.prototype.urlRoot = '/api/app_settings'
AppSetting.prototype.sync = require('backbone-http').sync(AppSetting)
