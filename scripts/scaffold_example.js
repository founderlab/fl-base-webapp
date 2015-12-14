import _ from 'lodash'
import Queue from 'queue-async'

import Application from '../server/models/application'
import Content from '../server/models/content'
import Engagement from '../server/models/engagement'
import Location from '../server/models/location'
import Opportunity from '../server/models/opportunity'
import Organisation from '../server/models/organisation'
import School from '../server/models/school'
import User from '../server/models/user'

const to_scaffold = {
  user: {
    email: 'admin@1scope.com',
    name: 'admin',
    admin: true,
    password: '1',
  },
  organisations: [{
    name: 'Evil corp',
  }],
  schools: [{
    name: 'St Marys',
  }],
  opportunities: [{
    name: 'Pay to win',
  }],
}

const models = {}

export default function scaffold(callback) {
  const queue = new Queue(1)

  queue.defer(callback => {
    const user = new User(to_scaffold.user)
    models.user = user
    user.set({password: User.createHash(user.get('password'))})
    user.save(callback)
  })

  models.organisations = []
  _.forEach(to_scaffold.organisations, (_org) => {
    queue.defer(callback => {
      const org = new Organisation(_org)
      models.organisations.push(org)
      org.save(callback)
    })
  })

  models.schools = []
  _.forEach(to_scaffold.schools, (_school) => {
    queue.defer(callback => {
      const school = new School(_school)
      models.schools.push(school)
      school.save(callback)
    })
  })

  models.opportunities = []
  _.forEach(to_scaffold.opportunities, (_opp) => {
    queue.defer(callback => {
      const opp = new Opportunity(_opp)
      models.opportunities.push(opp)
      opp.set({organisation: models.organisations[0]})
      opp.save(callback)
    })
  })

  queue.await(callback)
}
