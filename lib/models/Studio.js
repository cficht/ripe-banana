const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    city: {
      type: String,
      // select: false
    },
    state: {
      type: String,
      // select: false
    },
    country: {
      type: String,
      // select: false
    },
  },
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

schema.virtual('films', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'studio'
});

module.exports = mongoose.model('Studio', schema);
