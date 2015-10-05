
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'

if (!process.env.DATABASE_URL) {
  console.log('No process.env.DATABASE_URL present, using openshift values')

  const db = {
    user: process.env.OPENSHIFT_MONGODB_DB_USERNAME,
    pass: process.env.OPENSHIFT_MONGODB_DB_PASSWORD,
    host: process.env.OPENSHIFT_MONGODB_DB_HOST,
    port: process.env.OPENSHIFT_MONGODB_DB_PORT,
    app_name: process.env.OPENSHIFT_APP_NAME,
  }
  process.env.DATABASE_URL = `mongodb://${db.user}:${db.pass}@${db.host}:${db.port}/${db.app_name}`

  console.log('process.env.DATABASE_URL set to', process.env.DATABASE_URL)

}
