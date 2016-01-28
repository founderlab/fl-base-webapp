import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'
import {smartSync} from 'fl-server-utils'
import Inflection from 'inflection'

const db_url = process.env.DATABASE_URL
if (!db_url) console.log('Missing process.env.DATABASE_URL')

export default class StaticPage extends Backbone.Model {
  url = `${db_url}/static_pages`

  schema = () => _.extend({

  }, require('../../shared/models/schemas/static_page'))

  defaults() { return {created_at: moment.utc().toDate()} }

  static slugify(string) { return Inflection.dasherize((string || '').toLowerCase()) }
}

StaticPage.prototype.sync = smartSync(db_url, StaticPage)
