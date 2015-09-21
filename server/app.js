import './initialize'
import _ from 'lodash'
import URL from 'url'
import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import path from 'path'
import moment from 'moment'
import cookieParser from 'cookie-parser'
import passport from 'passport'

import config from './config'
//import login from './auth/logged_in'

let bind_options = {
  origins: config.origins,
  //auth: [login]
  auth: []
}
let app = bind_options.app = express()
console.info(`************** FounderLab_replaceme (${(require('../package.json')).version}) port: ${process.env.PORT} running env: '${process.env.NODE_ENV}' **************`)

//import session from './session'
//app.use(session)

app.set('port', config.port)
app.use(express.static(path.join(__dirname, '../dist')))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.all('/ping', (req, res) => res.status(200).end())
app.all('/time', (req, res) => res.json(moment.utc().toDate()))

import initAuth from './auth'
initAuth(bind_options)
import initApi from './api'
initApi(bind_options)
// React app last; handles all other routes
import initClientApps from './client_apps'
initClientApps(bind_options)

// start the server
http.createServer(app).listen(config.port, config.ip, () => console.log(`${config.env}-FounderLab_replaceme listening on port ${config.port} and url: ${config.url}`))
process.on('SIGTERM', () => {
  console.log(`${config.env}-FounderLab_replaceme stopping on port ${config.port}`)
  process.exit(0)
})

