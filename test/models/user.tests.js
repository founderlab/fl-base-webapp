import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import expect from 'expect'
import testInitDB from '../testInitDB'

const models = {}

describe('User', () => {

  before(callback => {
    const queue = new Queue(1)
    queue.defer(callback => testInitDB((err, _models) => {
      callback(err, _.extend(models, _models))
    }))
    queue.await(callback)
  })

  it('loads the users primary organisations subdomain', done => {
    const user = models.users.entrepreneurUser
    user.subdomain((err, subdomain) => {
      expect(err).toNotExist()
      expect(subdomain).toEqual(models.organisations[0].get('subdomain'))
      done()
    })
  })

  it('loads the users primary organisation', done => {
    const user = models.users.entrepreneurUser
    user.organisation((err, org) => {
      expect(err).toNotExist()
      expect(org.id).toEqual(models.organisations[0].id)
      done()
    })
  })
})
