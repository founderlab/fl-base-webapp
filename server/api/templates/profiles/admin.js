import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import User from '../../../models/User'
import Hotel from '../../../models/Hotel'

const template = (_profiles, options, callback) => {
  let single = false
  let profiles = _profiles
  if (!_.isArray(profiles)) {
    single = true
    profiles = [profiles]
  }
  const queue = new Queue()
  let hotels = []
  let users = []
  const hotelsQuery = {id: {$in: _(profiles).map('hotel_id').uniq().compact().value()}}
  const userQuery = {id: {$in: _(profiles).map('user_id').uniq().compact().value()}}
  queue.defer(callback => Hotel.cursor(hotelsQuery).toJSON((err, _hotels) => callback(err, hotels = _hotels)))
  queue.defer(callback => User.cursor(userQuery).toJSON((err, _users) => callback(err, users = _users)))

  queue.await(err => {
    if (err) return callback(err)

    _.forEach(profiles, profile => {
      if (!profile.displayName) profile.displayName = `${profile.firstName} ${profile.lastName}`
      profile.hotel = _.find(hotels, org => org.id === profile.hotel_id) || {}
      profile.user = _.omit(_.find(users, user => user.id === profile.user_id) || {}, 'password')
    })
    callback(null, single ? profiles[0] : profiles)
  })
}

template.$raw = true
export default template
