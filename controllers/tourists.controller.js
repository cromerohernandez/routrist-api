const createError = require('http-errors')
const mailer = require('../config/mailer.config')

const Tourist = require('../models/users/tourist.model')

const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000'

module.exports.create = (req, res, next) => {
  const { firstName, lastName, username, email, password } = req.body

  const tourist = new Tourist({
    firstName: firstName,
    lastName: lastName,
    username: username,
    email: email,
    password: password,
    photo: req.file ? req.file.url : undefined
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
      if(tourist) {
        tourist.validated = true
        tourist.save()
          .then(tourist => {
            res.status(200).redirect(`${CORS_ORIGIN}/`)
          })
          .catch(next)
      } else {
        throw createError(404, 'Tourist not found')
      }
    })
    .catch(next)
}

module.exports.profile = (req, res, next) => {
  Tourist.findOne({ _id: req.currentUser.id })
    .populate('routes')
    .then(tourist => {
      if (tourist) {
        res.status(200).json(tourist)
      } else {
        throw createError(404, 'Tourist not found')
      }
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {  
  Tourist.findOne({ _id: req.currentUser.id })
    .then(tourist => {
      if(tourist) {
        ['firstName', 'lastName', 'password', 'photo'].forEach(key => {
          if (req.body[key]) {
            tourist[key] = req.body[key]
          }
        })
        return tourist.save()
      } else {
        throw createError(404, 'Tourist not found')
      }
    })
    .then(editedTourist => {
      res.status(200).json(editedTourist)
    })
    .catch(next)
}

module.exports.delete = (req, res ,next) => {
  Tourist.findOneAndDelete({ _id: req.currentUser.id })
    .then(tourist => {
      if(tourist) {
        res.status(204).json()
      } else {
        throw createError(404, 'Tourist not found')
      }
    })
    .catch(next)
}