import moment from 'moment'
import Backbone from 'backbone'

const db_url = process.env.AUTH_DATABASE_URL || process.env.DATABASE_URL
if (!db_url) console.log('Missing process.env.DATABASE_URL')

export default class Target extends Backbone.Model {
  url = `${db_url}/targets`
  schema = () => ({
    name: 'String',
    description: 'String',
    created_at: 'Date',
    group: () => ['hasMany', require('./group')],
  })
  defaults() { return {created_at: moment.utc().toDate()} }
}

Target.prototype.sync = require('backbone-mongo').sync(Target)
