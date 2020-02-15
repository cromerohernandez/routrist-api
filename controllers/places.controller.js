const createError = require('http-errors')
const Place = require('../models/place.model')
const Like = require('../models/like.model')

module.exports.list = async (req, res, next) => {
  const places = await Place.find()
  const placesLikes = await Place.addTouristsRate(places)
  console.log(req.session)
  res.json(placesLikes)
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

module.exports.update = (req, res, next) => {
  const { name, city, photo, category, cityRate } = req.body

  Place.findByIdAndUpdate(
    req.params.id,
    {
      name: name,
      city: city,
      photo: photo,
      category: category,
      cityRate: cityRate
    },
    {new: true}
    )
    .then(place => {
      if(!place) {
        throw createError(404, 'Place not found')
      } else {
        res.status(200).json(place)
      }
    })
    .catch(next)
}

module.exports.delete = (req, res ,next) => {
  Place.findByIdAndDelete(req.params.id)
    .then(place => {
      if(!place) {
        throw createError(404, 'Place not found')
      } else {
        res.status(204).json()
      }
    })
    .catch(next)
}

module.exports.like = (req, res, next) => {
  const params = { tourist: req.body.tourist, place: req.params.id, state: req.body.state }

  const like = new Like(params)

  like.save()
  .then(() => res.status(201).json({likes: 1}))
  .catch(next)
}