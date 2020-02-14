const express = require('express')
const router = express.Router()

const touristsController = require('../controllers/tourists.controller')
const citiesController = require('../controllers/cities.controller')
const placesController = require('../controllers/places.controller')

//tourists
router.post('/tourists/new', touristsController.create)
router.get('/tourists/:token/validate', touristsController.validate)
router.patch('/tourists/:id'/*:username*/, touristsController.update)
router.delete('/tourists/:id'/*:username*/, touristsController.delete)

//cities
router.post('/cities/new', citiesController.create)
router.get('/cities/:token/validate', citiesController.validate)
router.patch('/cities/:id'/*:name*/, citiesController.update)
router.delete('/cities/:id'/*:name*/, citiesController.delete)

//places
router.get('/places', placesController.list) //// => dev FILTER & SORT
router.post('/places/new', placesController.create)
router.patch('/places/:id'/*:name*/, placesController.update)
router.delete('/places/:id'/*:name*/, placesController.delete)
router.post('/places/:id/like', placesController.like)

module.exports = router