// Fix for babel trying to make a temp file in the home directory where it can't write on openshift
// process.env.BABEL_DISABLE_CACHE = true
if (process.env.OPENSHIFT_DATA_DIR) {
  path = require('path')
  process.env.BABEL_CACHE_PATH = path.join(process.env.OPENSHIFT_DATA_DIR, 'babel-cache.json')
}

// Tell babel to include FounderLab packages (starting with fl-)
require('babel/register')({ignore: /node_modules\/(?!fl-)/})
require('./server/app')
