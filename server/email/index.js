import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'
import appConfig from '../config'
import querystring from 'querystring'
import passwordReset from './templates/passwordReset'
import Profile from '../models/Profile'

let transport = null

export function configure(config=appConfig) {
  const transportOptions = {
    host: config.email.host,
    port: +config.email.port,
    secureConnection: config.email.secure,
    auth: {
      user: config.email.user,
      pass: config.email.password,
    },
    debug: true,
  }
  transport = nodemailer.createTransport(smtpTransport(transportOptions))
}

// usage:
// sendMail({to: 'a@b.com', subject: 'testsubject', html: 'testemailtext'}, err => { ... } )
export default function sendMail(options, callback) {
  if (!transport) configure()
  if (!options.to) return callback(new Error('sendMail: missing options.to'))
  if (!options.from) options.from = appConfig.email.from

  if (process.env.NODE_ENV !== 'production') options.subject = `[${process.env.NODE_ENV}] ${options.subject}`

  console.log('===============================')
  console.log('Sending mail with options')
  console.dir(options, {colors: true, depth: null})
  console.log('===============================')
  transport.sendMail(options, callback)
}

export function sendResetEmail(user, callback) {
  const email = user.get('email')
  const query = querystring.stringify({email, resetToken: user.get('resetToken')})

  Profile.cursor({user_id: user.id, $one: true}).toJSON((err, profile) => {
    const options = {
      profile,
      resetUrl: `${appConfig.url}/reset?${query}`,
    }
    const message = passwordReset(options)

    console.log('[email sendResetEmail]', email, options, user.get('resetToken'), message)
    sendMail({
      to: email,
      subject: `Reset your Frameworkstein password`,
      html: message,
    }, callback)
  })
}
