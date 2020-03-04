const mongoose = require('mongoose')

const UserBase = require('./userBase.model')
const { capitalize } = require('../../helpers/models.helper')

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true,
    trim: true,
    set: capitalize
  },
  country: {
    type: String,
    required: [true, 'country is required'],
    trim: true,
    set: capitalize
  },
  shield: {
    type: String,
    default: 'https://res.cloudinary.com/dewymafth/image/upload/v1583169321//default/defaultCity.png'
  }
})

citySchema.virtual('places', {
  ref: 'Place',
  localField: '_id',
  foreignField: 'city',
  justOne: false
})

const City = UserBase.discriminator(
  'city',
  citySchema
)

module.exports = City