import fs from 'fs'
import path from 'path'
import _ from 'lodash'

const EXCLUDED_FILES = ['.DS_Store']

function removeDirectoryAndExtension(file, directory) {
  let filename = file.replace(`${directory}/`, '')
  return filename.replace(path.extname(filename), '')
}

export default class DirectoryUtils {

  static files(directory) {
    let results = []

    function processDirectory(directory) {
      if (!fs.existsSync(directory)) return
      fs.readdirSync(directory).forEach(file => {
        if (file in EXCLUDED_FILES) return

        const pathed_file = path.join(directory, file)
        const stat = fs.statSync(pathed_file)
        // a directory, process
        if (stat.isDirectory()) {
          processDirectory(pathed_file)
        } else {
           // a file, add to results
          results.push(pathed_file)
        }
      })
    }

    processDirectory(directory)
    return results
  }

  static modules(directory) {
    let results = {}
    DirectoryUtils.files(directory).forEach(file => {
      try {
        results[removeDirectoryAndExtension(file, directory)] = require(file)
      } catch (err) {
        console.log(err)
      }
    })
    return results
  }

  static functionModules(directory) {
    let results = DirectoryUtils.modules(directory)
    _.keys(results).forEach(file => {
      if (!_.isFunction(results[file])) delete results[file]
    })
    return results
  }
}
