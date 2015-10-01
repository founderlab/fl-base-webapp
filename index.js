// process.env.BABEL_DISABLE_CACHE = true
process.env.BABEL_CACHE_PATH = process.env.OPENSHIFT_DATA_DIR
// Tell babel to include FounderLab packages (starting with fl-)
require('babel/register')({ignore: /node_modules\/(?!fl-)/})
require('./server/app')
