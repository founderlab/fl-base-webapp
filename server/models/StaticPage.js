import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'
import Inflection from 'inflection'

const db_url = process.env.DATABASE_URL
if (!db_url) console.log('Missing process.env.DATABASE_URL')

export default class StaticPage extends Backbone.Model {
  url = `${db_url}/static_pages`

  schema = () => _.extend({

  }, require('../../shared/models/schemas/static_page'))

  static slugify(string) { return Inflection.dasherize((string || '').toLowerCase()) }
  defaults() { return {created_at: moment.utc().toDate()} }
}

StaticPage.prototype.sync = require('backbone-mongo').sync(StaticPage)
