const createError = require('http-errors')

const User = require('../models/users/userBase.model')

/*module.exports.login = (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw createError(400, 'Missing credentials')
  }

  User.findOne({ email: email, validated: true})
    .then(user => {
      if (!user) {
        throw createError(404, 'Invalid user or password')
      } else {
        return user.checkUserPassword(password)
          .then(match => {
            if (!match) {
              throw createError(400, 'Invalid user or password')
            } else {
              req.session.user = user
              res.json(user)
            }
          })
      }
    })
    .catch(next)
}*/

module.exports.login = (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw createError(400, 'Missing credentials')
  }

  User.findOne({ email: email, validated: true})
    .then(user => {
      if (!user) {
        throw createError(404, 'Invalid user or password')
      } else {
        return user.checkUserPassword(password)
          .then(match => {
            if (!match) {
              throw createError(400, 'Invalid user or password')
            } else if (user.__type = 'city')  {
              req.session.user = user
              res.redirect('cities/me')
            } else {
              req.session.user = user
              res.json(user)
            }
          })
      }
    })
    .catch(next)
}

module.exports.logout = (req, res) => {
  req.session.destroy()
  res.status(204).json()
}