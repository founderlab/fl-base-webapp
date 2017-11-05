export default (options) => `
<html>
  <body>
    <p>Dear ${options.profile.firstName},</p>

    <p>Welcome to Frameworkstein.</p>

    <p>I’m so excited to have you join our fast-growing platform, and I hope that you’re just as excited to increase your clientbase.</p>

    <p>To get started, please activate your account by clicking on the following link:</p>

    <p><a href="${options.confirmationUrl}">Activate your email</a></p>

    <p>Once your details have been reviewed by our team, you’ll receive an email confirming that your profile is live.</p>

    <p>Once again, thank you so much for choosing Frameworkstein.</p>

    <p>Please let me know if you have any questions or feedback - we’d love to hear from you!</p>

    <p>
      Kind regards,<br />
      Sapna<br />
      Founder & CEO<br />
      Frameworkstein
    </p>
  </body>
</html>
`
