import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'
import {smartSync} from 'fl-server-utils'

const db_url = process.env.DATABASE_URL
if (!db_url) console.log('Missing process.env.DATABASE_URL')

export default class Profile extends Backbone.Model {
  url = `${db_url}/profiles`

  schema = () => _.extend({

    user: () => ['belongsTo', require('./User')],
    location: () => ['belongsTo', require('./Location')],

  }, require('../../shared/models/schemas/profile'))

  defaults() { return {created_at: moment.utc().toDate()} }
}

Profile.prototype.sync = smartSync(db_url, Profile)
