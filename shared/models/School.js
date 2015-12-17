import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'

export default class School extends Backbone.Model {
  schema = () => _.extend({

    students: () => ['hasMany', require('./User')],

  }, require('./schemas/school'))

  defaults() { return {created_at: moment.utc().toDate()} }
}

School.prototype.urlRoot = '/api/schools'
School.prototype.sync = require('backbone-http').sync(School)
