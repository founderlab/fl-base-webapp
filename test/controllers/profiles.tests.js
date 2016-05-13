import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import expect from 'expect'
import scaffold from '../../scaffold/test'
import resetModels from '../resetModels'
import {canAccess as profileAuth} from '../../server/api/controllers/Profiles'

const models = {}
const tests = [
  {authFn: profileAuth, idFn: (models) => models.studentUser.get('profile').id},
]

describe('Profile authorisation', () => {

  before(callback => {
    const queue = new Queue(1)
    queue.defer(callback => resetModels(callback))
    queue.defer(callback => scaffold((err, _models) => callback(err, _.extend(models, _models))))
    queue.await(callback)
  })

  _.forEach(tests, ({authFn, idFn}) => {

    it('disallows $include', done => {
      const user = models.studentUser
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

    it('allows all methods if user is an admin', done => {
      const methods = ['GET', 'PUT', 'POST', 'DELETE']
      const queue = new Queue(1)
      _.forEach(methods, method => {
        queue.defer(callback => {
          const user = models.adminUser
          const req = {
            user,
            method,
            query: {},
            body: {},
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

    it('allows get methods for the users own profile by user_id', done => {
      const user = models.studentUser
      const req = {
        user,
        method: 'GET',
        params: {},
        query: {user_id: models.studentUser.id},
        body: {},
      }
      authFn({user, req}, (err, ok) => {
        expect(err).toNotExist()
        expect(ok).toExist()
        done()
      })
    })

    it('allows update methods for the users own data', done => {
      const methods = ['PUT', 'DELETE']
      const modelId = idFn(models)
      const queue = new Queue(1)
      _.forEach(methods, method => {
        queue.defer(callback => {
          const user = models.studentUser
          const req = {
            user,
            method,
            params: {id: modelId},
            query: {},
            body: {},
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

    it('disallows all methods for other users', done => {
      const modelId = idFn(models)
      const methods = ['GET', 'PUT', 'POST', 'DELETE']
      const queue = new Queue(1)

      _.forEach(methods, method => {
        queue.defer(callback => {
          const user = models.teacherUser
          const req = {
            user,
            method,
            params: {id: modelId},
            query: {},
            body: {},
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
