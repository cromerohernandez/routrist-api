const mongoose = require('mongoose')

const { calculateTouristsRate } = require('../helpers/models.helper')

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true,
    trim: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: [true, 'city is required'],
  },
  photo: {
    type: String,
    default: 'https://res.cloudinary.com/dewymafth/image/upload/v1583169321//default/defaultPlace.png'
  },
  category: {
    type: String,
    enum: [
      'building',
      'garden',
      'monument',
      'museum',
      'square',
      'temple'
    ],
    required: [true, 'category is required']
  },
  cityRate: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    default: 0,
    required: [true, 'rate is required']
  },
  schedule: {
    type: String
  },
  location: {
    latitude: {
      type: Number,
      required: [true, 'latitude is required']
    },
    longitude: {
      type: Number,
      required: [true, 'longitude is required']
    }
  },
  description: {
    type: String
  },
},
{ timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.touristsLikes;
      return ret;
    }
  }
})

placeSchema.virtual('touristsLikes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'place',
  justOne: false
})

placeSchema.virtual('touristsRate').get(function() {
  if (this.touristsLikes) {
    return calculateTouristsRate(this.touristsLikes)
  }
})

const Place = mongoose.model('Place', placeSchema)

module.exports = Place