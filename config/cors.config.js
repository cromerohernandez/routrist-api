const cors = require('cors')

const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5000',
  allowedHeaders: ['Content-Type'],
  credentials: true
})

module.exports = corsMiddleware