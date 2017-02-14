import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'

export default class Job extends Backbone.Model {
  schema = () => _.extend({

  }, require('./schemas/job'))

  defaults() { return {createdDate: moment.utc().toDate()} }
}

Job.prototype.urlRoot = '/api/jobs'
Job.prototype.sync = require('backbone-http').sync(Job)
