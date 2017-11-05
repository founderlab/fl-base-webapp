import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import Hotel from '../server/models/Hotel'

const longDescription = () => {
  const descriptions = [
    'Bacon ipsum dolor amet beef',
    'Tongue bresaola picanha, jowl rump prosciutto chicken shank landjaeger pancetta beef ribs.',
    'Biltong jerky alcatra, frankfurter short loin ribeye corned beef cupim. Jowl drumstick tongue jerky filet mignon meatloaf hamburger. Ground round pork chop flank, short ribs cupim andouille corned beef tail chuck rump kielbasa swine.',
    'Ground round drumstick landjaeger, jerky capicola jowl venison pork loin strip steak picanha ribeye kevin. Pancetta chicken cow ham hock shankle biltong ham. Jowl tri-tip leberkas, meatloaf pork chop salami chuck porchetta bresaola turducken.',
  ]
  return descriptions[Math.floor(Math.random()*descriptions.length)]
}

const toScaffold = {
  users: {
    adminUser: {
      email: 'admin@frameworkstein.com',
      password: 'frameworkstein',
      admin: true,
      profile: {
        displayName: 'admin person',
        firstName: 'admin',
        lastName: 'lname',
      },
    },
  },
}

toScaffold.hotels = require('./data/hotels')
const models = {}

export default function scaffold(callback) {
  const queue = new Queue(1)

  queue.defer(callback => {
    require('./shared')(toScaffold, (err, _models) => callback(err, _.extend(models, _models)))
  })

  models.hotels = []
  _.forEach(toScaffold.hotels, _org => {
    queue.defer(callback => {
      console.log('Creating hotel', _org.name)
      const org = new Hotel(_org)
      org.set({descriptionMd: longDescription()})
      models.hotels.push(org)
      org.save(callback)
    })
  })

  queue.await(err => callback(err, models))
}


