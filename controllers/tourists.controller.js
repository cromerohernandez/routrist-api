const express = require('express')

const Tourist = require('../models/tourist.model')
const createError = require('http-errors')

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

module.exports.delete = (req, res ,next) => {
  Tourist.deleteOne({
    _id: req.params.id
  })
  .then(response => {
    console.log(response)
    return res.send('Tourist deleted')
  })
  .catch(err => {
    console.log(err)
    return res.send(`${err}`)
  })
}