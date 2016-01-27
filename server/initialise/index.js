// require('pretty-error').start()
import config from '../config'

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'

// aws using rds
if (process.env.AWS) {
  console.log('Using RDS database')
  const db = {
    user: process.env.RDS_USERNAME,
    pass: process.env.RDS_PASSWORD,
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    name: `${process.env.NODE_ENV}-${config.name}`,
  }
  process.env.DATABASE_URL = `postgres://${db.user}:${db.pass}@${db.host}:${db.port}/${db.name}`
  console.log('db values', db)
  console.log('process.env.DATABASE_URL set to', process.env.DATABASE_URL)
}

// openshift
else if (!process.env.DATABASE_URL) {
  console.log('No process.env.DATABASE_URL present, using openshift values')

  const db = {
    user: process.env.OPENSHIFT_MONGODB_DB_USERNAME,
    pass: process.env.OPENSHIFT_MONGODB_DB_PASSWORD,
    host: process.env.OPENSHIFT_MONGODB_DB_HOST,
    port: process.env.OPENSHIFT_MONGODB_DB_PORT,
    name: process.env.OPENSHIFT_APP_NAME,
  }
  process.env.DATABASE_URL = `mongodb://${db.user}:${db.pass}@${db.host}:${db.port}/${db.name}`

  console.log('process.env.DATABASE_URL set to', process.env.DATABASE_URL)
}

// no jQuery, backbone needs an ajax function
const Backbone = require('backbone')
Backbone.ajax = require('fl-server-utils').createBasicAjax(config)

require('./db')(err => {
  if (err) console.log('Error configuring database:', err)
})
