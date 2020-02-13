const createError = require('http-errors')

const Tourist = require('../models/tourist.model')

module.exports.create = (req, res, next) => {
  const tourist = new Tourist({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    photo: req.body.photo
  })
  tourist.save()
    .then(tourist => res.status(201).json(tourist))
    .catch(next)
}

module.exports.update = (req, res, next) => {
  const { firstName, lastName, password, photo } = req.body
  Tourist.findByIdAndUpdate(
    req.params.id,
    {
      firstName: firstName,
      lastName: lastName,
      password: password,
      photo: photo
    },
    {new: true}
    )
    .then(tourist => {
      if(!tourist) {
        throw createError(404, 'Tourist not found')
      } else {
        res.status(200).json(tourist)
      }
    })
    .catch(err => {
      return res.send(`${err}`)
    })
}

module.exports.delete = (req, res ,next) => {
  Tourist.findByIdAndDelete(req.params.id)
    .then(tourist => {
      if(!tourist) {
        throw createError(404, 'Tourist not found')
      } else {
        res.status(204).json()
      }
    })
    .catch(err => {
      return res.send(`${err}`)
    })
}