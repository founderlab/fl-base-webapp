import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import moment from 'moment'
import Organisation from '../server/models/Organisation'

const toScaffold = {
  users: {
    adminUser: {
      email: 'admin@frameworkstein.com.au',
      password: 'frameworkstein',
      admin: true,
      profile: {
        nickname: 'Admin McAdminson',
        firstName: 'Admin',
        lastName: 'McAdminson',
      },
    },
    seekerUser: {
      email: 'seeker@frameworkstein.com.au',
      password: 'frameworkstein',
      profile: {
        nickname: 'Seeker McSeekerson',
        firstName: 'Seeker',
        lastName: 'McSeekerson',
      },
    },
  },
  organisations: [
    {
      name: 'UNSW',
      city: 'Sydney',
      country: 'Australia',
    },
  ],
}

const models = {}

export default function scaffold(callback) {
  const queue = new Queue(1)

  queue.defer(callback => {
    require('./shared')(toScaffold, (err, _models) => callback(err, _.extend(models, _models)))
  })

  models.organisations = []
  _.forEach(toScaffold.organisations, _org => {
    queue.defer(callback => {
      console.log('Creating organisation', _org.name)
      const org = new Organisation(_org)
      org.set({description: 'A place where things happen to other things'})
      models.organisations.push(org)
      org.save(callback)
    })
  })

  queue.await(err => callback(err, models))
}
