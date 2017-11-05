import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import Profile from '../server/models/Profile'
import Hotel from '../server/models/Hotel'

export default function junk(callback) {

  // const query = {
  //   // $or: [{'registrations.country': 'Australia'}, {'registrations.country': 'New Zealand'}],
  //   'registrations.isLawyer': true,
  //   'registrations.country': 'Australia',
  //   'workExperiences.fromYear': {$gte: 2000},
  //   $verbose: true,
  // }

  // Profile.cursor(query).toJSON((err, p) => {
  //   console.log(err, p)
  //   callback()
  // })
  Hotel.cursor({$unique: 'country', $select: ['country', 'city'], $verbose: true}).toJSON((err, results) => {
    console.log('$unique results', err, results)
    callback()
  })
}
