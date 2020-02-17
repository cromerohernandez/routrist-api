const express = require('express')
const router = express.Router()

const touristsController = require('../controllers/tourists.controller')
const citiesController = require('../controllers/cities.controller')
const placesController = require('../controllers/places.controller')
const usersController = require('../controllers/users.controller')

const authMiddleware = require('../middlewares/auth.middleware')

//tourists
router.post('/tourists/new', authMiddleware.isNotAuthenticated, touristsController.create)
router.get('/tourists/:token/validate', touristsController.validate)
router.patch('/tourists/:id'/*:username*/, authMiddleware.isAuthenticated, touristsController.update)
router.delete('/tourists/:id'/*:username*/, authMiddleware.isAuthenticated, touristsController.delete)

//cities
router.post('/cities/new', authMiddleware.isNotAuthenticated, citiesController.create)
router.get('/cities/:token/validate', citiesController.validate)
router.patch('/cities/:id'/*:name*/, authMiddleware.isAuthenticated, citiesController.update)
router.delete('/cities/:id'/*:name*/, authMiddleware.isAuthenticated, citiesController.delete)

//places
router.get('/places', authMiddleware.isAuthenticated, placesController.list) //// => dev FILTER & SORT
router.post('/places/new', authMiddleware.isAuthenticated, placesController.create)
router.patch('/places/:id', authMiddleware.isAuthenticated, placesController.update)
router.delete('/places/:id', authMiddleware.isAuthenticated, placesController.delete)
router.post('/places/:id/like', authMiddleware.isAuthenticated, placesController.like)

//routes

//sessions
router.post('/login', authMiddleware.isNotAuthenticated, usersController.login)
router.post('/logout', authMiddleware.isAuthenticated, usersController.logout)

module.exports = router