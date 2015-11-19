const DEFAULT_SECRET = 'CHANGEME'

const config = {
  ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '127.0.0.1',
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000,

  name: require('../package.json').name.split('.')[0],
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

  secret: DEFAULT_SECRET,
}

config.url = process.env.URL || `http://${config.ip}:${config.port}`
export default config

if (process.env.NODE_ENV === 'production' && config.secret === DEFAULT_SECRET) {
  console.error('config: Change your internal secret to one unique to this project. Its currently', DEFAULT_SECRET)
}
