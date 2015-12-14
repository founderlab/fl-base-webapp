// Fix for babel trying to make a temp file in the home directory where it can't write on openshift
// process.env.BABEL_DISABLE_CACHE = true
if (process.env.OPENSHIFT_DATA_DIR) {
  path = require('path')
  process.env.BABEL_CACHE_PATH = path.join(process.env.OPENSHIFT_DATA_DIR, 'babel-cache.json')
}

//  enable runtime transpilation to use ES6/7 in node
var fs = require('fs')
var babelrc = fs.readFileSync('./.babelrc')
var config

try {
  config = JSON.parse(babelrc)
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.')
  console.error(err)
}

require('babel-core/register')(config)

require('./server/app')
