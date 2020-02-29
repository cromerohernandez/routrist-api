const express = require('express')
const router = express.Router()

const touristsController = require('../controllers/tourists.controller')
const citiesController = require('../controllers/cities.controller')
const placesController = require('../controllers/places.controller')
const usersController = require('../controllers/users.controller')
const routesController = require('../controllers/routes.controller')

const authMiddleware = require('../middlewares/auth.middleware')
const userMiddleware = require('../middlewares/user.middleware')

//cities
router.get('/cities', authMiddleware.isAuthenticated, userMiddleware.isTourist, citiesController.list)
router.post('/cities/new', authMiddleware.isNotAuthenticated, citiesController.create)
router.get('/cities/:token/validate', citiesController.validate)
router.get('/cities/me', authMiddleware.isAuthenticated, userMiddleware.isCity, citiesController.profile)
router.get('/cities/me/places', authMiddleware.isAuthenticated, userMiddleware.isCity, placesController.list)
// router.get('/cities/me/places', authMiddleware.isAuthenticated, userMiddleware.isCity, citiesController.getPlaces)
router.patch('/cities/me', authMiddleware.isAuthenticated, userMiddleware.isCity, citiesController.update)
router.delete('/cities/me', authMiddleware.isAuthenticated, userMiddleware.isCity, citiesController.delete)
router.get('/cities/:cityName', authMiddleware.isAuthenticated, userMiddleware.isTourist, citiesController.detail)

//tourists
router.post('/tourists/new', authMiddleware.isNotAuthenticated, touristsController.create)
router.get('/tourists/:token/validate', touristsController.validate)
router.get('/tourists/me', authMiddleware.isAuthenticated, userMiddleware.isTourist, touristsController.profile)
router.patch('/tourists/me', authMiddleware.isAuthenticated, userMiddleware.isTourist, touristsController.update)
router.delete('/tourists/me', authMiddleware.isAuthenticated, userMiddleware.isTourist, touristsController.delete) 

//places
router.post('/places/new', authMiddleware.isAuthenticated, userMiddleware.isCity, placesController.create)
router.get('/places', authMiddleware.isAuthenticated, userMiddleware.isTourist, placesController.list)
router.get('/places/:id', authMiddleware.isAuthenticated, placesController.detail)
router.patch('/places/:id', authMiddleware.isAuthenticated, userMiddleware.isCity, userMiddleware.isPlaceOwner, placesController.update)
router.delete('/places/:id', authMiddleware.isAuthenticated, userMiddleware.isCity, userMiddleware.isPlaceOwner, placesController.delete)
router.post('/places/:id/like', authMiddleware.isAuthenticated, userMiddleware.isTourist, placesController.like)
router.post('/places/:id/dislike', authMiddleware.isAuthenticated, userMiddleware.isTourist, placesController.dislike)

//routes
router.post('/routes/new',  authMiddleware.isAuthenticated, userMiddleware.isTourist, routesController.create)
router.get('/routes/:id',  authMiddleware.isAuthenticated, userMiddleware.isTourist, userMiddleware.isRouteOwner, routesController.detail)
router.delete('/routes/:id', authMiddleware.isAuthenticated, userMiddleware.isTourist, userMiddleware.isRouteOwner, routesController.delete)

//sessions
router.post('/login', authMiddleware.isNotAuthenticated, usersController.login)
router.post('/logout', authMiddleware.isAuthenticated, usersController.logout)

module.exports = router