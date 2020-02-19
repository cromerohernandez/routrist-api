const mongoose = require('mongoose')

const { checkPassword, generateRandomToken, hashPassword, hashModifiedPassword } = require('../../helpers/models.helper')

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const userBaseSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [EMAIL_PATTERN, 'Email is invalid']
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

userBaseSchema.pre('findOneAndUpdate', async function (next) {
  if (this._update.password) {
    await hashModifiedPassword(next, this)
  }
})

userBaseSchema.methods.checkUserPassword = function (password) {
  return checkPassword(password, this)
}

const UserBase = mongoose.model('UserBase', userBaseSchema)

module.exports = UserBase