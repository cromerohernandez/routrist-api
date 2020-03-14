const createError = require('http-errors')

const Route = require('../models/route.model')
const Journey = require('../models/journey.model')

const { addSearch } = require('../helpers/controllers.helper')


module.exports.create = (req, res, next) => {
  const { name, city, journeys } = req.body

  const route = new Route({
    name: name,
    tourist: req.currentUser.id,
    city: city,
  })

  route.save()
    .then(route => {
      let DDBBjourneys = []

      journeys.map(journey => {
        const newJourney = new Journey({
          route: route._id,
          startDate: new Date(journey.startDate),
          steps: journey.steps
        })

        DDBBjourneys.push(
          newJourney.save()
        )
      })

      Promise.all(DDBBjourneys)
        .then(() => {
          res.status(201).json(route)
        .catch(error)
      })
    })
    .catch(next)
}

module.exports.list = (req, res, next) => {
  const criteria = { tourist: req.currentUser.id}
  const criteriaAndSearch = addSearch(req.query.name, criteria)

  Route.find(criteriaAndSearch)
    .populate('city')
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
    .populate('city')
    .populate('journeys')
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