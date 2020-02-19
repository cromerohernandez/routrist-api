const mongoose = require('mongoose')

const UserBase = require('./userBase.model')
const { capitalize } = require('../../helpers/models.helper')

const touristSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    set: capitalize
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    set: capitalize
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [4, 'Username needs at least 4 chars']
  },
  photo: {
    type: String,
    //default: '../../images/defaultTourist.png'
  }
})

const Tourist = UserBase.discriminator(
  'tourist',
  touristSchema
)

module.exports = Tourist