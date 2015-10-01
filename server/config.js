
const config = {
  ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '127.0.0.1',
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000,

  env: process.env.NODE_ENV || 'development',
  version: () => require('../package').version,
  origins: process.env.ORIGINS || '*',
  session_age: 365 * 24 * 60 * 60 * 1000,
  redis_sessions: false,
  name: require('../package.json').name.split('.')[0],
}
config.url = process.env.URL || `http://${config.ip}:${config.port}`
export default config
console.log('config', config)
