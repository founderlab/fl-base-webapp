import _ from 'lodash'

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'

if (!process.env.DATABASE_URL) {
  console.log('No process.env.DATABASE_URL present, using openshift values')
  process.env.DATABASE_URL = `mongodb://${process.env.OPENSHIFT_MONGODB_DB_HOST}:${process.env.OPENSHIFT_MONGODB_DB_PORT}/FounderLab_replaceme`
  console.log('process.env.DATABASE_URL set to', process.env.DATABASE_URL)
}
