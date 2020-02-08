require('dotenv').config()

const cookieParser = require('cookie-parser')
const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
const path = require('path')

require('./config/db.config')

/** 
 * Configure express
 */
const app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

/**
 * Configure routes
 */
const router = require('./config/routes.js')
app.use('/', router)