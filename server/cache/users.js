import cache from './index'
import UsersController from '../api/controllers/Users'

const cacheOptions = {ttl: 60 * 60 * 1000} // 1 hour
const idKey = id => `rl_user|${id}`
const verbose = false

export function wrapById(id, getUser, callback) {
  const key = idKey(id)
  return cache.wrap(key, getUser, cacheOptions, callback)
}

export function clearById(id, callback=(e => e)) {
  cache.del(idKey(id), err => {
    verbose && console.log('cleared', id, err, idKey(id))
    callback(err)
  })
}

UsersController.on('post:create', info => {
  info.json.user_id && clearById(info.json.user_id)
})

UsersController.on('post:update', info => {
  info.json.user_id && clearById(info.json.user_id)
})

UsersController.on('post:destroy', info => {
  User.cursor({id: info.req.params.id, $one: true}).values('user_id').toJSON((err, user_id) => {
    if (err) return console.log('[usercache] UsersController post:destroy error ', err, info.req.params)
    clearById(user_id)
  })
})

UsersController.on('post:destroyByQuery', info => {
  User.cursor(info.req.query).values('user_id').toJSON((err, ids) => {
    if (err) return console.log('[usercache] UsersController post:destroyByQuery error ', err, info.req.query)
    _.forEach(ids, id => clearById(id))
  })
})
