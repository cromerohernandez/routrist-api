const createError = require('http-errors')

const City = require('../models/city.model')

module.exports.create = (req, res, next) => {
  const { name, country, email, password, photo } = req.body

  const city = new City({
    name: name,
    country: country,
    email: email,
    password: password,
    photo: photo
  })

  city.save()
    .then(city => res.status(201).json(city))
    .catch(next)
}

module.exports.update = (req, res, next) => {
  const { name, country, password, photo } = req.body

  City.findByIdAndUpdate(
    req.params.id,
    {
      name: name,
      country: country,
      password: password,
      photo: photo
    },
    {new: true}
    )
    .then(city => {
      if(!city) {
        throw createError(404, 'City not found')
      } else {
        res.status(200).json(city)
      }
    })
    .catch(next)
}

module.exports.delete = (req, res ,next) => {
  City.findByIdAndDelete(req.params.id)
    .then(city => {
      if(!city) {
        throw createError(404, 'City not found')
      } else {
        res.status(204).json()
      }
    })
    .catch(next)
}