const createError = require('http-errors')
const Place = require('../models/place.model')
const Like = require('../models/like.model')

module.exports.list = async (req, res, next) => {
  const places = await Place.find()
  res.json(places)
}
module.exports.create = (req, res, next) => {
  const { name, city, photo, category, cityRate } = req.body

  const place = new Place({
    name: name,
    city: city,
    photo: photo,
    category: category,
    cityRate: cityRate
  })

  place.save()
    .then(place => res.status(201).json(place))
    .catch(next)
}

module.exports.like = (req, res, next) => {
  const params = { tourist: req.body.tourist, place: req.params.id, state: true }

  const like = new Like(params)

  like.save()
  .then(() => res.status(201).json({likes: 1}))
  .catch(next)
}