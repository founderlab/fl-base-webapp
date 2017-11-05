import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import Profile from '../../../models/Profile'

const template = (_users, options, callback) => {
  let single = false
  let users = _users
  if (!_.isArray(users)) {
    single = true
    users = [users]
  }
  const queue = new Queue()
  let profiles = []
  const profileQuery = {user_id: {$in: _(users).map('id').uniq().compact().value()}}
  queue.defer(callback => Profile.cursor(profileQuery).toJSON((err, _profiles) => callback(err, profiles = _profiles)))

  queue.await(err => {
    if (err) return callback(err)

    _.forEach(users, user => {
      if (!user.displayName) user.displayName = `${user.firstName} ${user.lastName}`
      user.profile = _.find(profiles, profile => profile.user_id === user.id) || {}
    })
    callback(null, single ? users[0] : users)
  })
}

template.$raw = true
export default template
