// require('pretty-error').start()
import path from 'path'
import initdb from 'fl-initdb'
import config from './config'

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'

// aws using rds
if (!process.env.DATABASE_URL) {
  console.log('No DATABASE_URL found, using RDS')
  const db = {
    user: process.env.RDS_USERNAME,
    pass: process.env.RDS_PASSWORD,
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    name: `${config.name}_${process.env.NODE_ENV}`,
  }
  process.env.DATABASE_URL = `postgres://${db.user}:${db.pass}@${db.host}:${db.port}/${db.name}`
  console.log('process.env.DATABASE_URL set to', process.env.DATABASE_URL)
}

// no jQuery, backbone needs an ajax function
const Backbone = require('backbone')
Backbone.ajax = require('fl-server-utils').createBasicAjax(config)

initdb({
  User: require('./models/User'),
  Models: [require('fl-auth-server').AccessToken, require('fl-auth-server').RefreshToken],
  databaseUrl: process.env.DATABASE_URL,
  modelsDir: path.resolve(__dirname, './models'),
  scaffold: require(`../scaffold/${process.env.NODE_ENV}`),
}, err => {if (err) console.log('Error initialising database:', err)})
