import './initialize'
import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import path from 'path'
import morgan from 'morgan'
import moment from 'moment'
import cookieParser from 'cookie-parser'
import {configure as configureAuth, sessionOrToken} from 'fl-auth'

import allow from './lib/cors'
import config from './config'
import sessionMiddleware from './session'
import initApi from './api'
import initClientApps from './client_apps'
import sendMail from './lib/email'

const bind_options = {
  origins: config.origins,
  auth: [sessionOrToken],
}

const app = bind_options.app = express()
console.info(`************** FounderLab_replaceme (${(require('../package.json')).version}) port: ${config.port} running env: '${config.env}' **************`)

app.set('port', config.port)
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '../dist')))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(sessionMiddleware)

// Allow all for now. Remember to keep cors before auth middleware
app.use(allow(config.origins))

// Auth after other middleware and before api/client
configureAuth({
  app,
  facebook: {
    app_id: process.env.FACEBOOK_APP_ID,
    app_secret: process.env.FACEBOOK_APP_SECRET,
    url: config.url,
  },
})

initApi(bind_options)
// React app last; handles all other routes
initClientApps(bind_options)

app.all('/ping', (req, res) => res.status(200).end())
app.all('/time', (req, res) => res.json(moment.utc().toDate()))

// start the server
http.createServer(app).listen(config.port, config.ip, () => console.log(`${config.env}-FounderLab_replaceme listening on port ${config.port} and url: ${config.url}`))
process.on('SIGTERM', () => {
  console.log(`${config.env}-FounderLab_replaceme stopping on port ${config.port}`)
  process.exit(0)
})


sendMail({to: 'gwilym.humphreys@gmail.com', subject: 'testsub', text: 'testemailtext'}, (err) => console.log('sent', err))
