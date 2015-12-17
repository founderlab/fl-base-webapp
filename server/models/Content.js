import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'

const db_url = process.env.DATABASE_URL
if (!db_url) console.log('Missing process.env.DATABASE_URL')

export default class Content extends Backbone.Model {
  url = `${db_url}/contents`

  schema = () => _.extend({

  }, require('../../shared/models/schemas/content'))

  defaults() { return {created_at: moment.utc().toDate()} }
}

Content.prototype.sync = require('backbone-mongo').sync(Content)
