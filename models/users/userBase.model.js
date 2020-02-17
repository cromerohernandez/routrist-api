const mongoose = require('mongoose')

const { checkPassword, hashPassword, generateRandomToken } = require('../../helpers/models.helper')

const userBaseSchema = new mongoose.Schema({
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