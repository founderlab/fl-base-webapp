import _ from 'lodash'
import session from 'express-session'
import URL from 'url'
import connectRedis from 'connect-redis'
import sessionstore from 'sessionstore'
import config from '../config'

let NO_SESSION_ROUTES = ['/ping']
let session_middleware = null

if (config.redis_sessions) {
  // store sessions in redis
  if (!process.env.SESSIONS_DATABASE_URL) console.trace('Missing process.env.SESSIONS_DATABASE_URL')

  let RedisStore = connectRedis(session)
  let session_url_parts = URL.parse(process.env.SESSIONS_DATABASE_URL)
  let redis_options = {host: session_url_parts.hostname, port: +session_url_parts.port || 6379, db: session_url_parts.pathname.split('/')[1], ttl: config.session_age/1000, prefix: `${process.env.NODE_ENV}-${config.name}-session:`}
  let session_store = new RedisStore(redis_options)
  console.log(`Using Redis Sessions: ${redis_options.host}:${redis_options.port}/${redis_options.db}`)

  session_middleware = session({saveUninitialized: true, resave: true, secret: 'AD83NPD0', cookie: {maxAge: config.session_age}, store: session_store})
}
else {
  // Skip, no redis on openshift yet
  sessionstore.createSessionStore()
  session_middleware = session({
    saveUninitialized: true,
    resave: true,
    secret: 'AD83NPD0',
    cookie: {maxAge: config.session_age},
    store: sessionstore.createSessionStore(),
  })
}

export default (req, res, next) => {
  if (_.contains(NO_SESSION_ROUTES, req.url)) return next()
  session_middleware(req, res, next)
}
