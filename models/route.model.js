const mongoose = require('mongoose')

const routeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
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
  startDate: {
    type: Date,
    required: [true, 'start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'end date is required']
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