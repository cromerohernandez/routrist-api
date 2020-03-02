const createError = require('http-errors')
const mailer = require('../config/mailer.config')

const City = require('../models/users/city.model')
const Place = require('../models/place.model')

const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000'

module.exports.create = (req, res, next) => {
  const { name, country, email, password } = req.body

  const city = new City({
    name: name,
    country: country,
    email: email,
    password: password,
    photo: req.file ? req.file.url : undefined
  })

  city.save()
    .then(city => {
      mailer.sendValidateCityEmail(city)
      res.status(201).json(city)
    })
    .catch(next)
}

module.exports.validate = (req, res, next) => {
  City.findOne({ validationToken: req.params.token })
    .then(city => {
      if(city) {
        city.validated = true
        city.save()
          .then(city => {
            res.status(200).redirect(`${CORS_ORIGIN}/`)
          })
          .catch(next)
      } else {
        throw createError(404, 'City not found')
      }
    })
    .catch(next)
}

module.exports.profile = (req, res, next) => {
  City.findOne({ _id: req.currentUser.id })
    .populate({
      path: 'places',
      populate: {
        path:'touristsLikes'
      }
    })
    .then(city => {
      if (city) {
        res.status(200).json(city)
      } else {
        throw createError(404, 'City not found')
      }
    })
    .catch(next)
}

module.exports.getPlaces = (req, res, next) => {
  Place.find({ city: req.currentUser.id })
    .then(places => {
      if (places) {
        res.status(200).json(places)
      } else {
        throw createError(404, 'Places not found')
      }
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {  
  City.findOne({ _id: req.currentUser.id })
    .then(city => {
      if(city) {
        ['name', 'country', 'password', 'photo'].forEach(key => {
          if (req.body[key]) {
            city[key] = req.body[key]
          }
        })
        return city.save()
      } else {
        throw createError(404, 'City not found')
      }
    })
    .then(editedCity => {
      res.status(200).json(editedCity)
    })
    .catch(next)
}

module.exports.delete = (req, res ,next) => {
  City.findOneAndDelete({ _id: req.currentUser.id })
    .then(city => {
      if(city) {
        res.status(204).json()
      } else {
        throw createError(404, 'City not found')
      }
    })
    .catch(next)
}

module.exports.list = (req, res, next) => {
  City.find()
    .then(cities => {
      if (cities) {
        res.status(200).json(cities)
      } else {
        throw createError(404, 'Cities not found')
      }
    })
    .catch(next)
}

module.exports.detail = (req, res, next) => {
  City.findOne({ name: req.params.cityName })
  .populate({
    path: 'places',
    populate: {
      path:'touristsLikes'
    }
  })
  .then(city => {
    if (city) {
      res.status(200).json(city)
    } else {
      throw createError(404, 'City not found')
    }
  })
  .catch(next)
}