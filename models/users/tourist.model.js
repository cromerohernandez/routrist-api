const mongoose = require('mongoose')

const UserBase = require('./userBase.model')
const { capitalize } = require('../../helpers/models.helper')

const touristSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'first name is required'],
    trim: true,
    set: capitalize
  },
  lastName: {
    type: String,
    required: [true, 'last name is required'],
    trim: true,
    set: capitalize
  },
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [4, 'username needs at least 4 chars']
  },
  photo: {
    type: String,
    default: 'https://res.cloudinary.com/dewymafth/image/upload/v1583169321//default/defaultTourist.png'
  }
})

touristSchema.virtual('routes', {
  ref: 'Route',
  localField: '_id',
  foreignField: 'tourist',
  justOne: false
})

const Tourist = UserBase.discriminator(
  'tourist',
  touristSchema
)

module.exports = Tourist