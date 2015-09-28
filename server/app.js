import './initialize'
import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import path from 'path'
import moment from 'moment'
import cookieParser from 'cookie-parser'
import {configure as configureAuth, loggedIn} from 'fl-auth-server'

import User from './models/user'
import config from './config'
import sessionMiddleware from './session'
import initApi from './api'
import initClientApps from './client_apps'

const bind_options = {
  origins: config.origins,
  auth: [loggedIn],
}
const app = bind_options.app = express()
console.info(`************** FounderLab_replaceme (${(require('../package.json')).version}) port: ${process.env.PORT} running env: '${process.env.NODE_ENV}' **************`)


// app.configure(function() {
//   app.use(express.static('public'));
//   app.use(express.cookieParser());
//   app.use(express.bodyParser());
//   app.use(express.session({ secret: 'keyboard cat' }));
//   app.use(passport.initialize());
//   app.use(passport.session());
//   app.use(app.router);
// });

app.set('port', config.port)
app.use(express.static(path.join(__dirname, '../dist')))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(sessionMiddleware)
app.use((req, res, next) => {
  console.log('session called')
  console.log('session:', req.session)
  next()
})

configureAuth({app, User})

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
