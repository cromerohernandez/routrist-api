const createError = require('http-errors')

module.exports.isTourist = (req, _, next) => {
  if (req.session.user.type = 'tourist') {
    next()
  } else {
    next(createError(401))
  }
}

module.exports.isCity = (req, _, next) => {
  if (req.session.user.type = 'city') {
    next()
  } else {
    next(createError(401))
  }
}