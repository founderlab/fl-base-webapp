import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'
import {smartSync} from 'fl-server-utils'
import slugify from 'slugify'

const dbUrl = process.env.DATABASE_URL
if (!dbUrl) console.log('Missing process.env.DATABASE_URL')

const MAX_SLUG_LENGTH = 64

export default class Profile extends Backbone.Model {
  url = `${dbUrl}/profiles`

  schema = () => _.extend({

    user: () => ['belongsTo', require('./User')],

  }, require('../../shared/models/schemas/profile'))

  defaults() {
    return {
      deleted: false,
      active: true,
      updatedDate: moment.utc().toDate(),
      createdDate: moment.utc().toDate(),
    }
  }

  static slug(profile, callback) {
    if (!profile.displayName) return callback(new Error(`Attempting to slugify a profile without a displayName: ${JSON.stringify(profile)}`))
    const slug = slugify(profile.displayName.toLowerCase()).slice(0, MAX_SLUG_LENGTH)

    // If the slug is taken keep adding a number to the end until we get to a unique value
    const generateSlug = (slug, count, callback) => {
      const nextSlug = count ? `${slug}-${count}` : slug

      Profile.exists({slug: nextSlug}, (err, exists) => {
        if (err) return callback(err)

        if (exists) return generateSlug(slug, count+1, callback)
        callback(null, nextSlug)
      })
    }

    generateSlug(slug, 0, callback)
  }

}

Profile.prototype.sync = smartSync(dbUrl, Profile)
