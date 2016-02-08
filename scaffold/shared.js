import _ from 'lodash'
import Queue from 'queue-async'

import StaticPage from '../server/models/StaticPage'
import User from '../server/models/User'
import AppSettings from '../server/models/AppSettings'

const defaults = {
  app_settings: {
    facebook_url: 'https://facebook.com/',
    twitter_url: 'https://twitter.com/',
    instagram_url: 'https://instagram.com/',
    footer_contact_info: `
      XX Fake st<br />
      Sydney<br />
      NSW 2000<br />
      Australia`,
  },
  static_pages: [
    {title: 'About Us'},
    {title: 'FAQ'},
    {title: 'Privacy'},
    {title: 'Terms of Service'},
  ],
}
const models = {}

export default function scaffold(_to_scaffold, callback) {
  const to_scaffold = _.extend(defaults, _to_scaffold)
  const queue = new Queue(1)

  const users = _.pick(to_scaffold, 'admin_user', 'student_user', 'teacher_user')
  _.forEach(users, (_user, key) => {
    queue.defer(callback => {
      User.findOne({email: _user.email}, (err, existing_user) => {
        if (err) return callback(err)
        if (existing_user) {
          models[key] = existing_user
          return callback()
        }
        const user = new User(_user)
        models[key] = user
        user.set({password: User.createHash(user.get('password'))})
        user.save(err => {
          if (err) return callback(err)
          user.get('profile').save(callback)
        })
      })
    })
  })

  queue.defer(callback => AppSettings.findOrCreate(to_scaffold.app_settings, callback))

  models.static_pages = []
  _.forEach(to_scaffold.static_pages, (_static_page, i) => {
    queue.defer(callback => {
      const page_defaults = {visible: true, show_in_footer: true, order: i, slug: StaticPage.slugify(_static_page.title)}
      const static_page = new StaticPage(_.extend(page_defaults, _static_page))
      models.static_pages.push(static_page)
      static_page.save(callback)
    })
  })

  queue.await(err => callback(err, models))
}
