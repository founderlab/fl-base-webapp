import _ from 'lodash'
import path from 'path'
import {directoryFunctionModules} from 'fl-server-utils'
import {Utils} from 'backbone-orm'

export default function resetModels(callback) {
  if (process.env.NODE_ENV !== 'test') return console.log('resetModels only runs in test enviroments')
  const modules = directoryFunctionModules(path.join(__dirname, '../server/models'))
  Utils.resetSchemas(_.values(modules), callback)
}
