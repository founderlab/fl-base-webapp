import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import moment from 'moment'
import Organisation from '../server/models/Organisation'

const toScaffold = {
  users: {
    adminUser: {
      email: 'admin@frameworkstein.com',
      password: 'frameworkstein',
      admin: true,
      profile: {
        nickname: 'admin person',
        firstName: 'admin',
        lastName: 'lname',
      },
    },
    seekerUser: {
      email: 'seeker@frameworkstein.com',
      password: 'frameworkstein',
      profile: {
        nickname: 'seeker person',
        firstName: 'seeker',
        lastName: 'lname',
      },
    },
  },
}

const models = {}

export default function scaffold(callback) {
  const queue = new Queue(1)

  queue.defer(callback => {
    require('./shared')(toScaffold, (err, _models) => callback(err, _.extend(models, _models)))
  })

  queue.await(err => callback(err, models))
}
