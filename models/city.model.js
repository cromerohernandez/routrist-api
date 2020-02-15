const mongoose = require('mongoose')

const { capitalize, checkPassword, hashPassword, generateRandomToken } = require('../helpers/models.helper')

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    set: capitalize
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
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
    //default: '../../images/defaultCity.png'
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

citySchema.pre('save', function (next) {
  hashPassword(next, this)
})

citySchema.methods.checkPassword = function (password) {
  checkPassword(password, this)
}

const City = mongoose.model('City', citySchema)

module.exports = City