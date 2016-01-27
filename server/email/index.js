import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'
import app_config from '../config'
import querystring from 'querystring'
import passwordReset from './templates/passwordReset'
import emailConfirmation from './templates/emailConfirmation'

let transport = null

export function configure(config=app_config) {
  const transport_options = {
    host: config.email.host,
    port: +config.email.port,
    secureConnection: config.email.secure,
    auth: {
      user: config.email.user,
      pass: config.email.password,
    },
    debug: true,
  }
  transport = nodemailer.createTransport(smtpTransport(transport_options))
}

// usage:
// sendMail({to: 'a@b.com', subject: 'testsubject', text: 'testemailtext'}, err => { ... } )
export default function sendMail(options, callback) {
  if (!transport) configure()
  if (!options.to) return callback(new Error('sendMail: missing options.to'))
  if (!options.from) options.from = app_config.email.from

  if (process.env.NODE_ENV !== 'production') options.subject = `[${process.env.NODE_ENV}] ${options.subject}`
  transport.sendMail(options, callback)
}

export function sendConfirmationEmail(user, callback) {
  const email = user.get('email')
  const query = querystring.stringify({email, token: user.get('email_confirmation_token')})
  const options = {confirmation_url: `${app_config.url}/confirm_email?${query}`}
  const message = emailConfirmation(options)
  console.log('Sending email_confirmation_token email', email, user.get('email_confirmation_token'), message)
  sendMail({to: email, subject: `Confirm your email for ${app_config.url}`, text: message}, callback)
}

export function sendResetEmail(user, callback) {
  const email = user.get('email')
  const query = querystring.stringify({email, reset_token: user.get('reset_token')})
  const options = {reset_url: `${app_config.url}/reset?${query}`}
  const message = passwordReset(options)
  console.log('Sending reset email', email, user.get('reset_token'), message)
  sendMail({to: email, subject: `Password reset for ${app_config.url}`, text: message}, callback)
}
