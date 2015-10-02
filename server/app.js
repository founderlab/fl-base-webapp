import './initialize'
import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import path from 'path'
import moment from 'moment'
import cookieParser from 'cookie-parser'
import {configure as configureAuth, ensureLoggedIn} from 'fl-auth/server'

import config from './config'
import sessionMiddleware from './session'
import initApi from './api'
import initClientApps from './client_apps'

const bind_options = {
  origins: config.origins,
  auth: [ensureLoggedIn],
}
const app = bind_options.app = express()
console.info(`************** FounderLab_replaceme (${(require('../package.json')).version}) port: ${config.port} running env: '${config.env}' **************`)

app.set('port', config.port)
app.use(express.static(path.join(__dirname, '../dist')))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(sessionMiddleware)
// app.use((req, res, next) => {
//   console.log('session called')
//   console.log('session:', req.session)
//   next()
// })

configureAuth({app})

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
