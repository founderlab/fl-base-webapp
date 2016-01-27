import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'

const db_url = process.env.DATABASE_URL
if (!db_url) console.log('Missing process.env.DATABASE_URL')

export default class AppSetting extends Backbone.Model {
  url = `${db_url}/app_settings`

  schema = () => _.extend({

  }, require('../../shared/models/schemas/app_settings'))

  defaults() { return {created_at: moment.utc().toDate()} }
}

AppSetting.prototype.sync = require('backbone-mongo').sync(AppSetting)
