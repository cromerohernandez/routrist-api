const express = require('express')
const router = express.Router()

const touristsController = require('../controllers/tourists.controller.js')

//tourists
router.post('/tourists/new', touristsController.create)
router.post('/tourists/:id'/*:username*/, touristsController.delete)

module.exports = router