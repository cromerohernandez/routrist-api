const createError = require('http-errors')
const mailer = require('../config/mailer.config')

const Tourist = require('../models/users/tourist.model')

module.exports.create = (req, res, next) => {
  const { firstName, lastName, username, email, password, photo } = req.body

  const tourist = new Tourist({
    firstName: firstName,
    lastName: lastName,
    username: username,
    email: email,
    password: password,
    photo: photo
  })

  tourist.save()
    .then(tourist => {
      mailer.sendValidateTouristEmail(tourist)
      res.status(201).json(tourist)
    })
    .catch(next)
}

module.exports.validate = (req, res, next) => {
  Tourist.findOne({ validationToken: req.params.token })
    .then(tourist => {
      if(!tourist) {
        throw createError(404, 'Tourist not found')
      } else {
        tourist.validated = true
        tourist.save()
          .then(tourist => {
            res.status(200).json(tourist)
          })
          .catch(next)
      }
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {
  const { firstName, lastName, password, photo } = req.body
  
  Tourist.findByIdAndUpdate(
    req.currentUser.id,
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
    .catch(next)
}

module.exports.delete = (req, res ,next) => {
  Tourist.findByIdAndDelete(req.currentUser.id)
    .then(tourist => {
      if(!tourist) {
        throw createError(404, 'Tourist not found')
      } else {
        res.status(204).json()
      }
    })
    .catch(next)
}