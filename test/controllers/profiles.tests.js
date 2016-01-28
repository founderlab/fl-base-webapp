import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import expect from 'expect'
import scaffold from '../../scaffold/test'
import resetModels from '../resetModels'
import {canAccess as profileAuth} from '../../server/api/controllers/Profiles'
import {canAccess as sessionAuth} from '../../server/api/controllers/LessonPartSessions'
import {canAccess as statusAuth} from '../../server/api/controllers/LessonStatuses'

const models = {}

describe('Profile/LessonPartSessions/LessonPartStatuses authorisation', () => {

  before(callback => {
    const queue = new Queue(1)
    queue.defer(callback => resetModels(callback))
    queue.defer(callback => scaffold((err, _models) => callback(err, _.extend(models, _models))))
    queue.await(callback)
  })

  _.forEach([profileAuth, sessionAuth, statusAuth], authFn => {

    it('allows anyone to GET', done => {
      const user = models.rep_user
      const req = {
        user,
        query: {},
        method: 'GET',
      }
      authFn({user, req}, (err, ok) => {
        expect(err).toNotExist()
        expect(ok).toExist()
        done()
      })
    })

    it('disallows $include', done => {
      const user = models.rep_user
      const req = {
        user,
        query: {$include: 'applications'},
        method: 'GET',
      }
      authFn({user, req}, (err, ok) => {
        expect(err).toNotExist()
        expect(ok).toNotExist()
        done()
      })
    })

    it('allows other methods if user is an admin', done => {
      const methods = ['PUT', 'POST', 'DELETE']
      const queue = new Queue(1)
      _.forEach(methods, method => {
        queue.defer(callback => {
          const user = models.admin_user
          const req = {
            user,
            method,
            query: {},
          }
          authFn({user, req}, (err, ok) => {
            expect(err).toNotExist()
            expect(ok).toExist()
            callback()
          })
        })
      })
      queue.await(done)
    })

    it('allows other methods for the users own profile', done => {
      const methods = ['PUT', 'POST', 'DELETE']
      const queue = new Queue(1)
      _.forEach(methods, method => {
        queue.defer(callback => {
          const user = models.rep_user
          const req = {
            user,
            method,
            params: {id: models.rep_user.get('profile').id},
            query: {},
          }
          authFn({user, req}, (err, ok) => {
            expect(err).toNotExist()
            expect(ok).toExist()
            callback()
          })
        })

      })
      queue.await(done)
    })

    it('disallows other methods if user isnt the rep that posted the opportunity', done => {
      const methods = ['PUT', 'POST', 'DELETE']
      const queue = new Queue(1)

      _.forEach(methods, method => {
        queue.defer(callback => {
          const user = models.rep_user
          const req = {
            user,
            method,
            params: {id: models.applicant_user.get('profile').id},
            query: {},
          }
          authFn({user, req}, (err, ok) => {
            expect(err).toNotExist()
            expect(ok).toNotExist()
            callback()
          })
        })

      })
      queue.await(done)
    })

  })
})
