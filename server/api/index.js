import _ from 'lodash'
import path from 'path'

import {directoryFunctionModules} from 'fl-server-utils'

export default (options) => {
  if (!options.app) throw new Error('Api init: Missing app from options')
  // create each controller from the controllers dir
  const modules = directoryFunctionModules(path.join(__dirname, './controllers'))
  _.keys(modules).forEach(file_path => new modules[file_path](options))
}
