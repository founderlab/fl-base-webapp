import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'

const db_url = process.env.DATABASE_URL
if (!db_url) console.log('Missing process.env.DATABASE_URL')

export default class School extends Backbone.Model {
  url = `${db_url}/schools`

  schema = () => _.extend({

    students: () => ['hasMany', require('./User')],
    location: () => ['hasMany', require('./Location')],

  }, require('../../shared/models/schemas/School'))

  defaults() { return {created_at: moment.utc().toDate()} }
}

School.prototype.sync = require('backbone-mongo').sync(School)
