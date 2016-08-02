import './initialise'
import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import path from 'path'
import morgan from 'morgan'
import moment from 'moment'
import cookieParser from 'cookie-parser'
import favicon from 'serve-favicon'
import s3Router from 'react-dropzone-s3-uploader/s3router'
import {configure as configureAuth, createInternalMiddleware} from 'fl-auth-server'
import {cors} from 'fl-server-utils'

import {sendConfirmationEmail, sendResetEmail} from './email'
import config from './config'
import sessionMiddleware from './session'
import initApi from './api'
import initClientApps from './clientApps'
import User from './models/User'

const bindOptions = {
  origins: config.origins,
  auth: [createInternalMiddleware({User, secret: config.secret})],
  dbMongo: config.database === 'mongodb',
}
const app = bindOptions.app = express()
console.log(`************** ${config.name} (${(require('../package.json')).version}) port: ${config.port} running env: '${config.env}' **************`)

app.set('port', config.port)
app.use(morgan('dev', {skip: req => req.url === '/ping'}))
app.use(express.static(path.join(__dirname, '../public')))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(sessionMiddleware)

// Remember to keep cors before auth middleware
app.use(cors(config.origins))

// Auth after other middleware and before api/client
configureAuth({
  app,
  User,
  sendConfirmationEmail,
  sendResetEmail,
  facebook: {
    appId: process.env.FACEBOOK_APP_ID,
    appSecret: process.env.FACEBOOK_APP_SECRET,
    url: config.url,
  },
  login: {
    extraRegisterParams: ['type'],
  },
})

app.use('/s3', (req, res, next) => {
  //todo: auth
  s3Router({
    bucket: config.s3Bucket,
    region: config.s3Region,
    headers: {'Access-Control-Allow-Origin': '*'},
    ACL: 'public-read',
  })(req, res, next)
})

app.all('/ping', (req, res) => res.status(200).end())
app.all('/time', (req, res) => res.json(moment.utc().toDate()))
app.use('/public', express.static(path.join(__dirname, '../public')))
app.use(favicon(path.join(__dirname, '../public/favicons/favicon.ico')))

initApi(bindOptions)
// React app last; handles all other routes
initClientApps(bindOptions)

// start the server
http.createServer(app).listen(config.port, config.ip, () => console.log(`${config.env}-${config.name} listening on port ${config.port} and url: ${config.url}`))
process.on('SIGTERM', () => {
  console.log(`${config.env}-${config.name} stopping on port ${config.port}`)
  process.exit(0)
})
