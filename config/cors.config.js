const cors = require('cors')

const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000' || 'https://maps.googleapis.com/maps/api',
  allowedHeaders: ['Content-Type', 'origin'],
  credentials: true
})

module.exports = corsMiddleware