import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'
import {beforeSend} from '../lib/headers'

export default class FaqItem extends Backbone.Model {
  schema = () => _.extend({

  }, require('./schemas/faqItem'))

  defaults() { return {createdDate: moment.utc().toDate()} }
}

FaqItem.prototype.urlRoot = '/api/faq_items'
FaqItem.prototype.sync = require('backbone-http').sync(FaqItem, {beforeSend})
