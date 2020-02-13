const mongoose = require('mongoose')

const touristSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [4, 'Username needs at least 4 chars']
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
  activationToken: {

  },
  validated: {
    type: Boolean,
    default: true
  }
}, 
{ timestamps: true,
  toJSON: {
    //virtuals: true,
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
})

const Tourist = mongoose.model('Tourist', touristSchema)

module.exports = Tourist