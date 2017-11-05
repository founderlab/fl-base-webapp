import _ from 'lodash'
import Queue from 'queue-async'
import StaticPage from '../server/models/StaticPage'
import User from '../server/models/User'
import AppSettings from '../server/models/AppSettings'
import Profile from '../server/models/Profile'
import FaqItem from '../server/models/FaqItem'

const defaults = {
  appSettings: {
    facebookUrl: 'https://facebook.com/',
    twitterUrl: 'https://twitter.com/',
    instagramUrl: 'https://instagram.com/',
    footerCopyright: `Copyright © Frameworkstein Pty Ltd 2017 ACN: 600 778 532`,
    ausPhone: '(61 2) 8386 6824',
    nzPhone: '(09) 889 1246',
    ukPhone: '(020) 3239 4664',
  },
  staticPages: [
    {title: 'About Us'},
    {title: 'FAQ'},
    {title: 'Privacy', content: '<p>privacy content</p>'},
    {title: 'Terms of Service', content: '<p>terms content</p>'},
  ],
  faqItems: require('./data/faqItems'),
}
const models = {}

export default function scaffold(_toScaffold, callback) {
  const toScaffold = _.extend(defaults, _toScaffold)
  const queue = new Queue(1)
  models.users = {}

  _.forEach(toScaffold.users, (userWithProfile, key) => {
    queue.defer(callback => {
      const {profile, ..._user} = userWithProfile
      console.log('Creating user', profile.displayName)
      User.findOne({email: _user.email}, (err, existingUser) => {
        if (err) return callback(err)
        if (existingUser) {
          models[key] = existingUser
          return callback()
        }
        const user = new User(_user)
        models.users[key] = user
        user.set({password: User.createHash(user.get('password'))})
        user.save(err => {
          if (err) return callback(err)

          Profile.slug(profile, (err, slug) => {
            if (err) return callback(err)
            profile.slug = slug
            profile.user_id = user.id
            profile.contactEmail = user.get('email')
            new Profile(profile).save(callback)
          })
        })
      })
    })
  })

  queue.defer(callback => AppSettings.findOrCreate(toScaffold.appSettings, callback))

  models.staticPages = []
  _.forEach(toScaffold.staticPages, (_staticPage, i) => {
    queue.defer(callback => {
      console.log('Creating page', _staticPage.title)
      const pageDefaults = {visible: true, showInFooter: true, order: i, slug: StaticPage.slugify(_staticPage.title)}
      const staticPage = new StaticPage(_.extend(pageDefaults, _staticPage))
      models.staticPages.push(staticPage)
      staticPage.save(callback)
    })
  })

  models.faqItems = []
  _.forEach(toScaffold.faqItems, (_faqItem, i) => {
    queue.defer(callback => {
      const defaults = {order: i}
      const faqItem = new FaqItem(_.extend(defaults, _faqItem))
      models.faqItems.push(faqItem)
      faqItem.save(callback)
    })
  })

  queue.await(err => callback(err, models))
}
