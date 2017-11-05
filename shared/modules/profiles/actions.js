import _ from 'lodash' // eslint-disable-line
import Profile from '../../models/Profile'

// These actions are for user profiles
// For user actions see `fl-auth-redux`
// Profiles are created by the User model on the server when an agent registers

export const TYPES = {
  PROFILE_LOAD: 'PROFILE_LOAD',
  PROFILE_COUNT: 'PROFILE_COUNT',
  PROFILE_SAVE: 'PROFILE_SAVE',
}

export function loadProfiles(query, callback) {
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

export function save(profile, callback) {
  const model = new Profile(profile)
  return {
    type: TYPES.PROFILE_SAVE,
    request: model.save.bind(model),
    callback,
  }
}
