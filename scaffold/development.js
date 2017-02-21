import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import moment from 'moment'
import Organisation from '../server/models/Organisation'
import Job from '../server/models/Job'

const longDescription = () => {
  const descriptions = [
    '###Bacon ipsum dolor amet beef',
    'Tongue bresaola picanha, jowl rump prosciutto chicken shank landjaeger pancetta beef ribs.',
    '* One',
    '* Two ribeye corned beef cupim. Jow',
    '* Three. Ground round drumstick landjaeger',
    'Biltong jerky alcatra, frankfurter short loin ribeye corned beef cupim. Jowl drumstick tongue jerky filet mignon meatloaf hamburger. Ground round pork chop flank, short ribs cupim andouille corned beef tail chuck rump kielbasa swine.',
    'Ground round drumstick landjaeger, jerky capicola jowl venison pork loin strip steak picanha ribeye kevin. Pancetta chicken cow ham hock shankle biltong ham. Jowl tri-tip leberkas, meatloaf pork chop salami chuck porchetta bresaola turducken.',
  ]
  return descriptions[Math.floor(Math.random()*descriptions.length)]
}

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
  jobs: require('./data/jobs.js'),
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
      org.set({descriptionMd: longDescription()})
      models.organisations.push(org)
      org.save(callback)
    })
  })

  models.jobs = []
  _.forEach(toScaffold.jobs, (_job, i) => {
    queue.defer(callback => {
      console.log('Creating job', _job.title)
      _job.organisation_id = models.organisations[i % models.organisations.length].id
      _job.detailsMd = _job.detailsMd || `${longDescription()}`
      const job = new Job(_job)
      models.jobs.push(job)
      job.save(callback)
    })
  })

  queue.await(err => callback(err, models))
}
