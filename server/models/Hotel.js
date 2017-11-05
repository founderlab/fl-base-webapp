import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'
import {smartSync} from 'fl-server-utils'

const dbUrl = process.env.DATABASE_URL
if (!dbUrl) console.log('Missing process.env.DATABASE_URL')

export default class Hotel extends Backbone.Model {
  url = `${dbUrl}/hotels`

  schema = () => _.extend({
    admins: () => ['hasMany', require('./User')],
  }, require('../../shared/models/schemas/hotel'))

  defaults() {
    return {
      deleted: false,
      visible: true,
      updatedDate: moment.utc().toDate(),
      createdDate: moment.utc().toDate(),
    }
  }
}

Hotel.prototype.sync = smartSync(dbUrl, Hotel)
