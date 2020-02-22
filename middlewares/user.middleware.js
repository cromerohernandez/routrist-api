const createError = require('http-errors')

const Place = require('../models/place.model')
const Route = require('../models/route.model')

module.exports.isTourist = (req, _, next) => {
  if (req.session.user.type === 'tourist') {
    next()
  } else {
    next(createError(401))
  }
}

module.exports.isCity = (req, _, next) => {
  if (req.session.user.type === 'city') {
    next()
  } else {
    next(createError(401))
  }
}

module.exports.isPlaceOwner = (req, _, next) => {
  Place.findOne({ _id: req.params.id})
    .then(place => {
      if (req.session.user.id === place.city.toString()) {
        next()
      } else {
        next(createError(401))
      }
    })
    .catch(next)
}

module.exports.isRouteOwner = (req, res, next) => {
  Route.findOne({ _id: req.params.id})
    .then(route => {
      if (req.session.user.id === route.tourist.toString()) {
        next()
      } else {
        next(createError(401))
      }
    })
    .catch(next)
}