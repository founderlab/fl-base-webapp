import _ from 'lodash'
import session from 'express-session'
import URL from 'url'
import connectRedis from 'connect-redis'
import sessionstore from 'sessionstore'
import config from '../config'

const NO_SESSION_ROUTES = ['/ping']
let sessionMiddleware = null

const sessions_dbUrl = process.env.SESSIONS_DATABASE_URL
if (!sessions_dbUrl) console.log('Warning: Missing process.env.SESSIONS_DATABASE_URL')

if (sessions_dbUrl && sessions_dbUrl.match(/^redis/)) {
  const RedisStore = connectRedis(session)
  const sessionUrlParts = URL.parse(sessions_dbUrl)
  const redisOptions = {host: sessionUrlParts.hostname, port: +sessionUrlParts.port || 6379, db: sessionUrlParts.pathname.split('/')[1], ttl: config.sessionAge/1000, prefix: `${process.env.NODE_ENV}-${config.name}-session:`}
  const sessionStore = new RedisStore(redisOptions)
  console.log(`Using redis sessions: ${redisOptions.host}:${redisOptions.port}/${redisOptions.db}`)
  sessionMiddleware = session({saveUninitialized: true, resave: true, secret: 'Ag8ajdD&asdjq3k234HpDkJ', cookie: {maxAge: config.sessionAge}, store: sessionStore})
}
else {
  if (sessions_dbUrl && !sessions_dbUrl.match(/^memory/)) console.log(`Unknown session db protocol: ${sessions_dbUrl}`)
  console.log(`Using memory sessions`)

  sessionstore.createSessionStore()
  sessionMiddleware = session({
    saveUninitialized: true,
    resave: true,
    secret: 'Ag8ajdD&asdjq3k234HpDkJ',
    cookie: {maxAge: config.sessionAge},
    store: sessionstore.createSessionStore(),
  })
}

export default (req, res, next) => {
  if (!sessionMiddleware || _.includes(NO_SESSION_ROUTES, req.url)) return next()
  sessionMiddleware(req, res, next)
}
