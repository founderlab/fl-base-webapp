import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
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
  const hotelsQuery = {id: {$in: _(profiles).map('hotel_id').uniq().compact().value()}}
  queue.defer(callback => Hotel.cursor(hotelsQuery).toJSON((err, _hotels) => callback(err, hotels = _hotels)))

  queue.await(err => {
    if (err) return callback(err)

    _.forEach(profiles, profile => {
      if (!profile.displayName) profile.displayName = `${profile.firstName} ${profile.lastName}`
      profile.hotel = _.find(hotels, org => org.id === profile.hotel_id) || {}
      profile.workExperiences = _.sortBy(profile.workExperiences || [], w => (w.isCurrent || !w.toYear) ? -9999 : -w.toYear)
      profile.educations = _.sortBy(profile.educations || [], w => (w.isCurrent || !w.toYear) ? -9999 : -w.toYear)
      profile.isLawyer = !!_.find(profile.registrations, r => r.isLawyer)
      profile.isAgent = !!_.find(profile.registrations, r => !r.isLawyer)
    })
    callback(null, single ? profiles[0] : profiles)
  })
}

template.$raw = true
export default template
