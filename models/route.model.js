const mongoose = require('mongoose')

const routeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    lowercase: true
  },
  tourist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tourist',
    required: [true, 'Tourist is required']
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: [true, 'City is required'],
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  places: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place'
    }
  ],
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

const Route = mongoose.model('Route', routeSchema)

module.exports = Route