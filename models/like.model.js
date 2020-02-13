const mongoose = require('mongoose')

const likeSchema = new mongooseSchema({
  tourist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tourist',
    required: [true, 'Tourist is required'],
  },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
    required: [true, 'Place is required'],
  },
  state: {
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
      return ret;
    }
  }
})

const Like = mongoose.model('Like', likeSchema)

module.exports = Like