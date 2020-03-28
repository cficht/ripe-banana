const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
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

schema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'reviewer'
});

schema.virtual('film', {
  ref: 'Film',
  localField: '_id',
  foreignField: '_id'
});

schema.statics.deleteReviewer = function(id) {
  return this.model('Review').find({ reviewer: id })
    .then(reviews => {
      return reviews.length < 1 ? this.findByIdAndDelete(id) : function(){throw Error('Reviewer has reviews');}();
      // if(reviews.length === 0) {
      //   return this.findByIdAndDelete(id);
      // } else {
      //   throw Error('This reviewer has reviews and cannot be deleted');
      // }
    });
};

module.exports = mongoose.model('Reviewer', schema);
