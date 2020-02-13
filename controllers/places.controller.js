const Place = require('../models/place.model')

module.exports.list = async (req, res, next) => {
  const places = await Place.find()
  res.json(places)
}