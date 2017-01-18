export default (options) => `
<html>
  <body>
    <h4>Passwords suck!</h4>
    <p>You can reset your password here: <a href="${options.resetUrl}">Reset your password</a>.</p>
    <p>Hope your day improves :)</p>
    <p>- Password Bot</p>
  </body>
</html>
`
