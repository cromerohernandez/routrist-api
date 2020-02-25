const nodemailer = require('nodemailer')

const APP_HOST = process.env.APP_HOST || 'http://localhost:5000'

const user = process.env.MAIL_USER
const pass = process.env.MAIL_PASS

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user, pass }
})

module.exports.sendValidateTouristEmail = (targetUser) => {
  transporter.sendMail({
    from: `Routrist <${user}>`,
    to: targetUser.email,
    subject: 'Welcome to Routrist!',
    html: `
      <h1>Welcome ${targetUser.firstName}</h1>
      <p><a href='${APP_HOST}/tourists/${targetUser.validationToken}/validate'>Confirm</a> your account and start to sightseeing with Routrist!</p>
    `
  })
  .then(info => console.log(info))
  .catch(error => console.log(error))
}

module.exports.sendValidateCityEmail = (targetUser) => {
  transporter.sendMail({
    from: `Routrist <${user}>`,
    to: targetUser.email,
    subject: 'Welcome to Routrist!',
    html: `
      <h1>Welcome ${targetUser.name}</h1>
      <p><a href='${APP_HOST}/cities/${targetUser.validationToken}/validate'>Confirm</a> your account and start to share yours places with tourists!</p>
    `
  })
  .then(info => console.log(info))
  .catch(error => console.log(error))
}