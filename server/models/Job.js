import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'
import {smartSync} from 'fl-server-utils'

const dbUrl = process.env.DATABASE_URL
if (!dbUrl) console.log('Missing process.env.DATABASE_URL')

export default class Job extends Backbone.Model {
  url = `${dbUrl}/jobs`

  schema = () => _.extend({

    creator: () => ['belongsTo', require('./User')],
    updater: () => ['belongsTo', require('./User'), {as: 'editedJobs'}],
    organisation: () => ['belongsTo', require('./Organisation')],

  }, require('../../shared/models/schemas/job'))

  defaults() { return {deleted: false, createdDate: moment.utc().toDate()} }
}

Job.prototype.sync = smartSync(dbUrl, Job)
