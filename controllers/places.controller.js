const createError = require('http-errors')

const Place = require('../models/place.model')
const Like = require('../models/like.model')

const { setCriteria, addSearch, setSort } = require('../helpers/controllers.helper')

module.exports.create = (req, res, next) => {
  const { name, category, cityRate, schedule, latitude, longitude, description } = req.body

  const place = new Place({
    name: name,
    city: req.currentUser.id,
    photo: req.file ? req.file.url : undefined,
    category: category,
    cityRate: cityRate,
    schedule: schedule,
    location: {
      latitude: latitude,
      longitude: longitude
    },
    description: description
  })

  place.save()
    .then(place => res.status(201).json(place))
    .catch(next)
}

module.exports.list = (req, res, next) => {
  req.query.city = req.query.city || req.currentUser.id
  const criteria = setCriteria(req.query)
  const criteriaAndSearch = addSearch(req.query.name, criteria)
  const sort = setSort(req.query)

  Place.find(criteriaAndSearch)
    .populate('touristsLikes')
    .sort(sort)
    .then(places => {
      if(places) {
        res.status(200).json(places)
      } else {
        throw createError(404, 'Places not found')
      }
    })
    .catch(next)
}

module.exports.detail = (req, res, next) => {
  Place.findOne({ _id: req.params.id })
    .populate('touristsLikes')
    .then(place => {
      if(place) {
        res.status(200).json(place)
      } else {
        throw createError(404, 'Place not found')
      }
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {
  const { name, category, cityRate, schedule, latitude, longitude, description } = req.body

  Place.findOneAndUpdate(
    { _id: req.params.id },
    {
      name: name,
      city: req.currentUser.id,
      photo: req.file ? req.file.url : undefined,
      category: category,
      cityRate: cityRate,
      schedule: schedule,
      location: {
        latitude: latitude,
        longitude: longitude
      },
      description: description
    },
    { new: true }
  )
    .then(place => {
      if(place) {
        res.status(200).json(place)
      } else {
        throw createError(404, 'Place not found')
      }
    })
    .catch(next)
}

module.exports.delete = (req, res ,next) => {
  Place.findOneAndDelete({ _id: req.params.id })
    .then(place => {
      if(place) {
        res.status(204).json()
      } else {
        throw createError(404, 'Place not found')
      }
    })
    .catch(next)
}

module.exports.like = (req, res, next) => {
  const params = { tourist: req.currentUser.id, place: req.params.id }

  Like.findOne(params)
    .then(like => {
      if (like && like.state === false ) {
        Like.findOneAndUpdate(
          { _id: like.id },
          { state: true },
          { new: true }
        )
          .then(() => {
            res.status(200).json({ like: +1 })
          })
          .catch(next)
      } else if (!like) {
        const like = new Like({...params, state: true})

        like.save()
          .then(() => res.status(201).json({ like: +1 }))
          .catch(next)
      } else {
        throw createError(400, 'Tourist can´t give like again')
      }
    })
    .catch(next)
}

module.exports.dislike = (req, res, next) => {
  const params = { tourist: req.currentUser.id, place: req.params.id }

  Like.findOne(params)
    .then(dislike => {
      if (dislike && dislike.state === true ) {
        Like.findOneAndUpdate(
          { _id: dislike.id },
          { state: false },
          { new: true }
        )
          .then(() => {
            res.status(200).json({ like: -1 })
          })
          .catch(next)
      } else if (!dislike) {
        const dislike = new Like({...params, state: false})

        dislike.save()
          .then(() => res.status(201).json({ like: -1 }))
          .catch(next)
      } else {
        throw createError(400, 'Tourist can´t give dislike again')
      }
    })
    .catch(next)
}