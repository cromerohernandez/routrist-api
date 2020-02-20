const express = require('express')
const router = express.Router()

const touristsController = require('../controllers/tourists.controller')
const citiesController = require('../controllers/cities.controller')
const placesController = require('../controllers/places.controller')
const usersController = require('../controllers/users.controller')

const authMiddleware = require('../middlewares/auth.middleware')
const userMiddleware = require('../middlewares/user.middleware')

//tourists
router.post('/tourists/new', authMiddleware.isNotAuthenticated, touristsController.create)
router.get('/tourists/:token/validate', touristsController.validate)
  //router.get('/tourists/me'), authMiddleware.isAuthenticated, userMiddleware.isTourist, touristsController.profile)
router.patch('/tourists/me', authMiddleware.isAuthenticated, userMiddleware.isTourist, touristsController.update)
router.delete('/tourists/me', authMiddleware.isAuthenticated, userMiddleware.isTourist, touristsController.delete)

//cities
router.post('/cities/new', authMiddleware.isNotAuthenticated, citiesController.create)
router.get('/cities/:token/validate', citiesController.validate)
  //router.get('cities/me', authMiddleware.isAuthenticated, user.userMiddleware.isCity, citiesController.profile)
router.patch('/cities/me', authMiddleware.isAuthenticated, userMiddleware.isCity, citiesController.update)
router.delete('/cities/me', authMiddleware.isAuthenticated, userMiddleware.isCity, citiesController.delete)

//places
router.get('/places', authMiddleware.isAuthenticated, placesController.list) //// => dev FILTER & SORT
router.get('/places/:id', authMiddleware.isAuthenticated, placesController.detail)
router.post('/places/new', authMiddleware.isAuthenticated, userMiddleware.isCity, placesController.create)
router.patch('/places/:id', authMiddleware.isAuthenticated, userMiddleware.isCity, placesController.update)
router.delete('/places/:id', authMiddleware.isAuthenticated, userMiddleware.isCity, placesController.delete)
router.post('/places/:id/like', authMiddleware.isAuthenticated, userMiddleware.isTourist, placesController.like)
router.post('/places/:id/dislike', authMiddleware.isAuthenticated, userMiddleware.isTourist, placesController.dislike)

//routes

//sessions
router.post('/login', authMiddleware.isNotAuthenticated, usersController.login)
router.post('/logout', authMiddleware.isAuthenticated, usersController.logout)

module.exports = router