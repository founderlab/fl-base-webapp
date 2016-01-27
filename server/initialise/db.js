import _ from 'lodash'
import Queue from 'queue-async'
import path from 'path'
import {directoryFunctionModules} from 'fl-server-utils'
import User from '../models/User'

export default (callback) => {
  const queue = new Queue()

  const ModelTypes = directoryFunctionModules(path.join(__dirname, '../models'))
  _.forEach(ModelTypes, Model => queue.defer(callback => Model.db().ensureSchema(callback)))

  queue.await(err => {
    if (err) return callback(err)
    User.exists({admin: true}, (err, exists) => {
      if (err || exists) return callback(err)
      if (!exists) {
        console.log(`No admin user exists. Running scaffold script for env ${process.env.NODE_ENV}`)
        try {
          const scaffold = require(`../../scripts/${process.env.NODE_ENV}`)
          scaffold(callback)
        }
        catch (err) {
          return callback(err)
        }
      }
    })
  })
}
