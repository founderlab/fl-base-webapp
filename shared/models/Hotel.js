import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'
import {beforeSend} from '../lib/headers'

export default class Hotel extends Backbone.Model {
  schema = () => _.extend({

    profiles: () => ['hasMany', require('./Profile')],

  }, require('./schemas/hotel'))

  defaults() { return {createdDate: moment.utc().toDate()} }
}

Hotel.prototype.urlRoot = '/api/hotels'
Hotel.prototype.sync = require('backbone-http').sync(Hotel, {beforeSend})
