import _ from 'lodash'
import session from 'express-session'
import URL from 'url'
import connectRedis from 'connect-redis'
import sessionstore from 'sessionstore'
import config from '../config'

const NO_SESSION_ROUTES = ['/ping']
let session_middleware = null

const sessions_db_url = process.env.SESSIONS_DATABASE_URL
if (!sessions_db_url) console.trace('Missing process.env.SESSIONS_DATABASE_URL')

if (sessions_db_url.match(/^redis/)) {

  const RedisStore = connectRedis(session)
  const session_url_parts = URL.parse(sessions_db_url)
  const redis_options = {host: session_url_parts.hostname, port: +session_url_parts.port || 6379, db: session_url_parts.pathname.split('/')[1], ttl: config.session_age/1000, prefix: `${process.env.NODE_ENV}-${config.name}-session:`}
  const session_store = new RedisStore(redis_options)
  console.log(`Using redis sessions: ${redis_options.host}:${redis_options.port}/${redis_options.db}`)
  session_middleware = session({saveUninitialized: true, resave: true, secret: 'Ag878w23Ab5JKHpDkJ', cookie: {maxAge: config.session_age}, store: session_store})

} else {

  if (!sessions_db_url.match(/^memory/)) console.log(`Unknown session db protocol: ${sessions_db_url}`)
  console.log(`Using memory sessions`)

  sessionstore.createSessionStore()
  session_middleware = session({
    saveUninitialized: true,
    resave: true,
    secret: 'avS&D7yDy7d12knas9',
    cookie: {maxAge: config.session_age},
    store: sessionstore.createSessionStore(),
  })
}

export default (req, res, next) => {
  if (!session_middleware || _.contains(NO_SESSION_ROUTES, req.url)) return next()
  session_middleware(req, res, next)
}
