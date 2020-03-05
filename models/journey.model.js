const mongoose = require('mongoose')

const journeySchema = new mongoose.Schema({
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: [true, 'route is required'],
  },
  startDate: {
    type: Date,
    required: [true, 'date is required']
  },
  steps: [{
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place',
    },
    visitingTime: {
      type: Number,
    }
  }]
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


const Journey = mongoose.model('Journey', journeySchema)

module.exports = Journey