const express = require('express')
const router = express.Router()

const touristsController = require('../controllers/tourists.controller.js')

//tourists
router.post('/tourists/new', touristsController.create)
router.patch('/tourists/:id'/*:username*/, touristsController.update)
router.delete('/tourists/:id'/*:username*/, touristsController.delete)

module.exports = router