export default (options) => `
<html>
  <body>
    <p>Dear ${options.profile.firstName},</p>

    <p>Reset your password by clicking on the following link:</p>

    <p><a href="${options.resetUrl}">Reset my password</a></p>

    <p>If you did not initiate this request, please reply to this email. Your password will not change until you create a new password using the above link.</p>

    <p>
      Thank you,<br />
      Frameworkstein.com
    </p>

  </body>
</html>
`
