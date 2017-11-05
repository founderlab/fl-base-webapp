import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'
import {smartSync} from 'fl-server-utils'

const dbUrl = process.env.DATABASE_URL
if (!dbUrl) console.log('Missing process.env.DATABASE_URL')

export default class FaqItem extends Backbone.Model {
  url = `${dbUrl}/faq_items`

  schema = () => _.extend({

  }, require('../../shared/models/schemas/faqItem'))

  defaults() { return {createdDate: moment.utc().toDate()} }
}

FaqItem.prototype.sync = smartSync(dbUrl, FaqItem)
