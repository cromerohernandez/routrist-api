const mongoose = require('mongoose')

const routeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  tourist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tourist',
    required: [true, 'tourist is required']
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'city',
    required: [true, 'city is required'],
  },
  traveled: {
    type: Boolean,
    default: false
  }
},
{ timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
})

routeSchema.virtual('journeys', {
  ref: 'Journey',
  localField: '_id',
  foreignField: 'route',
  justOne: false
})

const Route = mongoose.model('Route', routeSchema)

module.exports = Route