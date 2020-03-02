const createError = require('http-errors')

const Route = require('../models/route.model')

const { addSearch } = require('../helpers/controllers.helper')


module.exports.create = (req, res, next) => {
  const { name, city, startDate, endDate, places } = req.body

  const route = new Route({
    name: name,
    tourist: req.currentUser.id,
    city: city,
    startDate: startDate,
    endDate: endDate,
    places, places
  })

  route.save()
    .then(route => res.status(201).json(route))
    .catch(next)
}

module.exports.list = (req, res, next) => {
  const criteria = { tourist: req.currentUser.id}
  const criteriaAndSearch = addSearch(req.query.name, criteria)

  Route.find(criteriaAndSearch)
    //.populate('city')
    .then(routes => {
      if(routes) {
        res.status(200).json(routes)
      } else {
        throw createError(404, 'Routes not found')
      }
    })
    .catch(next)
}

module.exports.detail = (req, res, next) => {
  Route.findOne({ _id: req.params.id })
    .populate('places')
    .then(route => {
      if(route) {
        res.status(200).json(route)
      } else {
        throw createError(404, 'Route not found')
      }
    })
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  Route.findOneAndDelete({ _id: req.params.id })
    .then(route => {
      if(route) {
        res.status(204).json()
      } else {
        throw createError(404, 'Route not found')
      }
    })
    .catch(next)
}