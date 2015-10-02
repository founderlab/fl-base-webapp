
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'

if (!process.env.DATABASE_URL) {
  console.log('No process.env.DATABASE_URL present, using openshift values')

  const base_db_url = `mongodb://${OPENSHIFT_MONGO_DB_USERNAME}:${OPENSHIFT_MONGO_DB_PASSWORD}@${process.env.OPENSHIFT_MONGODB_DB_HOST}:${process.env.OPENSHIFT_MONGODB_DB_PORT}`
  process.env.DATABASE_URL = `${base_db_url}}/FounderLab_replaceme`

  console.log('process.env.DATABASE_URL set to', process.env.DATABASE_URL)
}
