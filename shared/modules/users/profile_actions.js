import _ from 'lodash' // eslint-disable-line
import Profile from '../../models/Profile'
import Location from '../../models/Location'

// These actions are for user profiles
// For user actions see fl-auth-redux

export const TYPES = {
  PROFILE_LOAD: 'PROFILE_LOAD',
  PROFILE_SAVE: 'PROFILE_SAVE',
}

export function loadProfile(query, callback) {
  return {
    type: TYPES.PROFILE_LOAD,
    request: Profile.cursor(query),
    callback,
  }
}

export function loadActiveProfile(query, callback) {
  query.$one = true
  return {
    type: TYPES.PROFILE_LOAD,
    active: true,
    request: Profile.cursor(query),
    callback,
  }
}

export function updateProfile(data, callback) {
  const profile = new Profile(data.profile)
  const location = new Location(data.location)
  return {
    type: TYPES.PROFILE_SAVE,
    request: (callback) => {
      location.save((err, location) => {
        if (err) return callback(err)
        profile.set({location})
        profile.save(err => {
          if (err) return callback(err)
          callback(null, {profile, location})
        })
      })
    },
    callback,
  }
}
