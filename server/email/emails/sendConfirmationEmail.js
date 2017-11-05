import _ from 'lodash' //eslint-disable-line
import querystring from 'querystring'
import sendMail from '../index'
import appConfig from '../../config'
import emailConfirmation from '../templates/emailConfirmation'

export default function sendConfirmationEmail({user, profile}, callback) {
  const email = user.email
  const query = querystring.stringify({email, token: user.emailConfirmationToken})
  const options = {
    profile,
    confirmationUrl: `${appConfig.url}/confirm-email?${query}`,
  }
  const message = emailConfirmation(options)

  console.log('[email sendConfirmationEmail]', email, options, user.emailConfirmationToken, message)
  sendMail({
    to: email,
    subject: `Please activate your Frameworkstein account`,
    html: message,
    from: appConfig.welcomeFrom,
    bcc: appConfig.adminEmail,
  }, callback)
}
