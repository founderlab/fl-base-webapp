// process.env.BABEL_DISABLE_CACHE = true
path = require('path')
process.env.BABEL_CACHE_PATH = path.join(process.env.OPENSHIFT_DATA_DIR, 'babel-cache.json')
// Tell babel to include FounderLab packages (starting with fl-)
require('babel/register')({ignore: /node_modules\/(?!fl-)/})
require('./server/app')
