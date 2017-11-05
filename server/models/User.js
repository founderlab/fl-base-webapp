import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'
import Queue from 'queue-async'
import {smartSync} from 'fl-server-utils'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'
import EventEmitter from 'events'
import {wrapById} from '../cache/users'
import profileSchema from '../../shared/models/schemas/profile'
let Profile
let Hotel

const LAST_ACTIVE_UPDATE_INTERVAL = 1000 * 60 * 60 // 1 minute

const dbUrl = process.env.DATABASE_URL
if (!dbUrl) console.log('Missing process.env.DATABASE_URL')

export default class User extends Backbone.Model {
  url = `${dbUrl}/users`

  schema = () => _.extend({
    profile: () => ['hasOne', Profile = require('./Profile')],
  }, require('../../shared/models/schemas/user'))

  static events = new EventEmitter()

  static createHash(password) { return bcrypt.hashSync(password) }

  defaults() { return {createdDate: moment.utc().toDate()} }

  /*
   * Ensure that a new user has an hotel an a profile
   */
  onCreate(_profile, _callback) {
    const profile = _callback ? _profile : {}
    const callback = _callback ? _callback : _profile

    const displayName = `${profile.firstName} ${profile.lastName}`
    const hotelNameOrId = this.get('hotelNameOrId') || displayName
    const queue = new Queue(1)

    // temp logging
    const VERBOSE = true
    const log = (...args) => VERBOSE && console.log(...args)
    //
    let orgId

    queue.defer(callback => {
      log('checking hotelNameOrId', hotelNameOrId, _.isString(hotelNameOrId), _.isNumber(hotelNameOrId))
      Hotel.findOne({$or: [{id: hotelNameOrId}, {name: hotelNameOrId}]}, (err, org) => {
        // Assume errors here are from the given hotelNameOrId not being an integer

        const q = new Queue(1)

        if (org) {
          orgId = org.id
        }
        else {
          log('making new org with ', {name: hotelNameOrId})
          q.defer(callback => Hotel.findOrCreate({name: hotelNameOrId}, (err, org) => callback(err, orgId = org.id)))
        }

        q.await(err => {
          if (err) return callback(err)
          log('saving user')
          this.save({}, callback)
        })
      })
    })

    queue.await(err => {
      if (err) return callback(err)

      const profileModel = new Profile({
        ..._.pick(profile, _.keys(profileSchema)),
        displayName,
        user: this,
        emailMd5: crypto.createHash('md5').update(this.get('email')).digest('hex'),
        hotel_id: orgId,
      })

      log('saving orgId to profile', orgId)
      profileModel.save(err => {
        if (err) return callback(err)
        const result = {user: this.toJSON(), profile: profileModel.toJSON()}

        callback(err, result)
      })
    })
  }

  static onSubscribeToPlan(options, callback) {
    const {userId, subscription} = options
    if (!userId) return callback(new Error('[User.onSubscribeToPlan] Missing userId'))
    if (!subscription || !subscription.plan) return callback(new Error('[User.onSubscribeToPlan] Missing subscription or plan'))

    Profile.findOne({user_id: userId}, (err, profile) => {
      if (err) return callback(err)
      profile.set({
        planId: subscription.plan.id,
        planExpiresDate: new Date(subscription.current_period_end),
        homepageFeatured: !!subscription.plan.metadata.homepageFeatured,
        searchFeatured: !!subscription.plan.metadata.searchFeatured,
      })

      profile.save(callback)
    })
  }

  static deserializeUser(id, callback) {
    if (process.env.VERBOSE) console.time(`deserializeUser_${id}`)
    const getUser = callback => User._deserializeUser(id, callback)
    const done = (err, user) => {
      if (process.env.VERBOSE) console.timeEnd(`deserializeUser_${id}`)
      callback(err, user)
    }
    return wrapById(id, getUser, done)
  }

  static _deserializeUser(id, callback) {
    User.cursor({id, $one: true}).toJSON((err, user) => {
      if (err || !user) return callback(err, null)
      const now = new Date()

      if (!user.lastActiveDate || (now.getTime() - user.lastActiveDate > LAST_ACTIVE_UPDATE_INTERVAL)) {
        const userModel = new User(user)
        return userModel.save({lastActiveDate: now}, err => {
          if (err) return callback(err, user)

          Profile.findOne({user_id: user.id}, (err, profile) => {
            if (err || !profile) return callback(err, user)
            profile.save({lastActiveDate: now}, err => {
              callback(err, user)
            })
          })
        })
      }

      callback(err, user)
    })
  }

  static passwordIsValidForId(id, password, callback) {
    User.cursor({id, $one: true}).values('password').toJSON((err, passwordHash) => {
      if (err) return callback(err)
      bcrypt.compare(password, passwordHash, callback)
    })
  }

  passwordIsValid(password) { return bcrypt.compareSync(password, this.get('password')) }
}

User.prototype.sync = smartSync(dbUrl, User)
