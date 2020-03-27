const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
  role: {
    type: String
  },
  actor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Actor',
    required: true
  }
});

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio',
    required: true
  },
  released: {
    type: Number,
    required: true,
    min: 1000,
    max: 9999
  },
  cast: [castSchema]
// }, {
//   toJSON: {
//     virtuals: true,
//     transform: (doc, ret) => {
//       delete ret.id;
//       delete ret.address;
//     }
//   }
});

schema.statics.getAll = function() {
  return this
    .aggregate([
      {
        '$lookup': {
          'from': 'studios', 
          'localField': 'studio', 
          'foreignField': '_id', 
          'as': 'studio'
        }
      }, {
        '$project': {
          'title': true, 
          'released': true, 
          'studio': {
            '_id': true, 
            'name': true
          }
        }
      }, {
        '$unwind': {
          'path': '$studio'
        }
      }
    ]);
};

module.exports = mongoose.model('Film', schema);
