import './initialize'
import _ from 'lodash'
import URL from 'url'
import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import path from 'path'
import moment from 'moment'
import cookieParser from 'cookie-parser'
import {configure as configureAuth, loggedIn} from 'fl-auth-server'

import User from './models/user'
import config from './config'

let bind_options = {
  origins: config.origins,
  auth: [loggedIn]
}
let app = bind_options.app = express()
console.info(`************** FounderLab_replaceme (${(require('../package.json')).version}) port: ${process.env.PORT} running env: '${process.env.NODE_ENV}' **************`)

//import session from './session'
//app.use(session)

app.set('port', config.port)
app.use(express.static(path.join(__dirname, '../dist')))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

configureAuth({app, User})

app.all('/ping', (req, res) => res.status(200).end())
app.all('/time', (req, res) => res.json(moment.utc().toDate()))


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
