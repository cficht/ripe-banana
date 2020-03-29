const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reviewer',
    required: true
  },
  review: {
    type: String,
    maxlength: 140,
    required: true
  },
  film: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
    required: true
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

schema.statics.getTopReviews = function() {
  return this
    .aggregate([
      {
        '$lookup': {
          'from': 'films', 
          'localField': 'film', 
          'foreignField': '_id', 
          'as': 'film'
        }
      }, {
        '$project': {
          'rating': true, 
          'review': true, 
          'film': {
            '_id': true, 
            'title': true
          }
        }
      }, {
        '$unwind': {
          'path': '$film'
        }
      }, {
        '$sort': {
          'rating': -1
        }
      }, {
        '$limit': 100
      }
    ]);
};

module.exports = mongoose.model('Review', schema);
