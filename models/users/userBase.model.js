const mongoose = require('mongoose')

const { checkPassword, generateRandomToken, hashPassword } = require('../../helpers/models.helper')

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const userBaseSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [EMAIL_PATTERN, 'email is invalid']
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [8, 'password needs at least 8 chars']
  },
  validationToken: {
    type: String,
    default: generateRandomToken
  },
  validated: {
    type: Boolean,
    default: false
  }
},
{
  discriminatorKey: '__type',
  collection: 'users',
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = doc._id;
      ret.type = doc.__type;
      delete ret._id;
      delete ret.__v;
      delete ret.__type;
      delete ret.password;
      delete ret.validationToken;
      return ret;
    }
  }
})

userBaseSchema.pre('save', function (next) {
  hashPassword(next, this)
})

userBaseSchema.methods.checkUserPassword = function (password) {
  return checkPassword(password, this)
}

const UserBase = mongoose.model('UserBase', userBaseSchema)

module.exports = UserBase