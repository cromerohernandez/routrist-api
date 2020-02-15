const mongoose = require('mongoose')
const Like = require('./like.model')

const { calculateTouristsRate } = require('../helpers/models.helper')

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    trim: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: [true, 'City is required'],
  },
  photo: {
    type: String,
    //default: '../../images/defaultPlace.png'
  },
  category: {
    type: String,
    enum: [
      'facade',
      'interior',
      'museum',
      'park'
    ],
    required: [true, 'Category is required']
  },
  cityRate: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    default: 0,
    required: [true, 'Rate is required']
  },
},
{ timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
})

placeSchema.static('addTouristsRate', function(places) {
  const promises = places.map(place => Like.find({ place: place.id }))

  return Promise.all(promises)
    .then((likesPerPlace) => {
      return places.map((place, i) => ({
        ...place.toJSON(),
        touristsRate: likesPerPlace[i].length > 0 ? calculateTouristsRate(likesPerPlace[i]) : 0
      }))
    })
})

const Place = mongoose.model('Place', placeSchema)

module.exports = Place