import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'

const toScaffold = {
  users: {
    adminUser: {
      email: 'admin@frameworkstein.com',
      password: 'changeme',
      admin: true,
      profile: {
        displayName: 'admin person',
        firstName: 'admin',
        lastName: '',
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
