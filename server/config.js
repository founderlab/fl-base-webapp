// todo: change this when working with more than one server
const DEFAULT_SECRET = require('crypto').randomBytes(16).toString('hex')

const name = require('../package.json').name.split('.')[0]

const config = {
  ip: process.env.IP || '127.0.0.1',
  port: process.env.PORT || 3000,

  env: process.env.NODE_ENV || 'development',
  version: require('../package').version,

  origins: process.env.ORIGINS || '*',
  session_age: 365 * 24 * 60 * 60 * 1000,

  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    user: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM,
  },

  secret: process.env.INTERNAL_SECRET || DEFAULT_SECRET,

  s3_bucket: `${process.env.NODE_ENV}-${name}`,
  s3_region: 'ap-southeast-2',

  max_file_upload_size: 1024 * 1024 * 10, //10mb

  // These keys from this config object are passed to the clients store
  client_config_keys: ['name', 'url', 's3_url', 'max_file_upload_size'],
}

config.s3_url = `https://${config.s3_bucket}.s3-${config.s3_region}.amazonaws.com`

config.name = name
config.url = process.env.URL || `http://${config.ip}:${config.port}`
export default config

if (process.env.NODE_ENV === 'production' && config.secret === DEFAULT_SECRET) {
  console.error('config: Change your internal secret (process.env.INTERNAL_SECRET) to one unique to this project. Its currently', DEFAULT_SECRET)
}
