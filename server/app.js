import './initialize'
import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import path from 'path'
import morgan from 'morgan'
import moment from 'moment'
import cookieParser from 'cookie-parser'
import {configure as configureAuth, sessionOrToken, createInternalMiddleware} from 'fl-auth-server'
import favicon from 'serve-favicon'

import {sendResetEmail} from './lib/email'
import allow from './lib/cors'
import config from './config'
import sessionMiddleware from './session'
import initApi from './api'
import initClientApps from './client_apps'

const bind_options = {
  origins: config.origins,
  auth: [createInternalMiddleware({secret: config.secret}), sessionOrToken],
}
const app = bind_options.app = express()
console.log(`************** FounderLab_replaceme (${(require('../package.json')).version}) port: ${config.port} running env: '${config.env}' **************`)

app.set('port', config.port)
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '../public')))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(sessionMiddleware)

// Allow all for now. Remember to keep cors before auth middleware
app.use(allow(config.origins))

// Auth after other middleware and before api/client
configureAuth({
  app,
  sendResetEmail,
  facebook: {
    app_id: process.env.FACEBOOK_APP_ID,
    app_secret: process.env.FACEBOOK_APP_SECRET,
    url: config.url,
  },
})

app.all('/ping', (req, res) => res.status(200).end())
app.all('/time', (req, res) => res.json(moment.utc().toDate()))
app.use('/public', express.static(path.join(__dirname, '../client/public')))
app.use(favicon(path.join(__dirname, '../client/public/favicon.ico')))

initApi(bind_options)
// React app last; handles all other routes
initClientApps(bind_options)

// start the server
http.createServer(app).listen(config.port, config.ip, () => console.log(`${config.env}-FounderLab_replaceme listening on port ${config.port} and url: ${config.url}`))
process.on('SIGTERM', () => {
  console.log(`${config.env}-FounderLab_replaceme stopping on port ${config.port}`)
  process.exit(0)
})
