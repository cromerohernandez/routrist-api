const mongoose = require('mongoose')
const Likes = require()

const placeSchema = new mongooseSchema({
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
      'museum',
      'park'
    ],
    required: [true, 'Category is required']
  },
  rateCity: {
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
      delete ret.password;
      return ret;
    }
  }
})

placeSchema.virtual('touristsRate', {
  ref: '',
  localField: '',
  foreignField: '',
  justOne: false,
});

userSchema.virtual('touristsRate').get(function() {
  const touristsLikes = 
  const touristsVotes = 
  const touristsRate = Math.floor((touristsLikes * 5) / touristsVotes)
  return this.email.slice(this.email.indexOf('@') + 1);
})

const Place = mongoose.model('Place', placeSchema)

module.exports = Place