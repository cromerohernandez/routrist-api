const createError = require('http-errors')

module.exports.isTourist = (req, _, next) => {
  if (req.session.user.__type === 'tourist') {
    next()
  } else {
    next(createError(401))
  }
}

module.exports.isCity = (req, _, next) => {
  if (req.session.user.__type === 'city') {
    next()
  } else {
    next(createError(401))
  }
}