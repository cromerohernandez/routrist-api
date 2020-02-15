const createError = require('http-errors')

const Tourist = require('../models/tourist.model')
const City = require('../models/city.model')

module.exports.login = (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw createError(400, 'missing credentials')
  }

  Tourist.findOne({ email: email})
    .then(tourist => {
      if (!tourist) {
        City.findOne({ email: email})
          .then(city => {
            if (!city) {
              throw createError(404, 'invalid user or password')
            } else {
              return city.checkPassword(password)
                .then(match => {
                  if (!match) {
                    throw createError(400, 'invalid user or password')
                  } else {
                    req.session.user = city
                    req.session.userType = 'city'
                    res.json(city)
                  }
                })
            }
          })
      } else {
        return tourist.checkTouristPassword(password)
          .then(match => {
            console.log(match)
            if (!match) {
              throw createError(400, 'invalid user or password')
            } else {
              req.session.user = tourist
              req.session.userType = 'tourist'
              console.log(req.session)
              res.json(tourist)
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