export default (options) => `
<html>
  <body>
    <h4>Welcome</h4>
    <p>Hit this link to <a href="${options.confirmationUrl}">confirm your email</a>.</p>
    <p>Thanks!</p>
    <p>- Email Confirmation Bot</p>
  </body>
</html>
`
