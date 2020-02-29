const mongoose = require('mongoose')

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
      'garden',
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