const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    city: {
      type: String
    },
    state: {
      type: String
    },
    country: {
      type: String
    }
  }
// }, {
//   toJSON: {
//     virtuals: true,
//     transform: (doc, ret) => {
//       delete ret.id;
//       delete ret.address;
//       delete ret.__v;
//     }
//   }
});

schema.virtual('films', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'studio'
});

module.exports = mongoose.model('Studio', schema);
