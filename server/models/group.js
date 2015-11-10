import moment from 'moment'
import Backbone from 'backbone'

const db_url = process.env.AUTH_DATABASE_URL || process.env.DATABASE_URL
if (!db_url) console.log('Missing process.env.DATABASE_URL')

export default class Group extends Backbone.Model {
  url = `${db_url}/groups`
  schema = () => ({
    name: 'String',
    description: 'String',
    created_at: 'Date',
  })
  defaults() { return {created_at: moment.utc().toDate()} }
}

Group.prototype.sync = require('backbone-mongo').sync(Group)
