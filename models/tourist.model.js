const mongoose = require('mongoose')

const { capitalize } = require('../helpers/helper')
const { generateRandomToken } = require('../helpers/helper')

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
    minlength: [4, 'Username needs at least 4 chars'],
    set: capitalize
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password needs at least 8 chars']
  },
  photo: {
    type: String,
    //default: '../../images/defaultTourist.png'
  },
  validateToken: {
    type: String,
    default: generateRandomToken
  },
  validated: {
    type: Boolean,
    default: false
  }
}, 
{ timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      delete ret.validateToken;
      return ret;
    }
  }
})

const Tourist = mongoose.model('Tourist', touristSchema)

module.exports = Tourist