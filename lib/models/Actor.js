const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date
  },
  pob: {
    type: String
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
      if(ret.films) {
        ret.films.forEach(film => {
          delete film.cast;
        });
      }
    }
  }
});

schema.virtual('films', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'cast.actor'
});

schema.methods.removeId = function() {
  const actor = this.toJSON();
  delete actor._id;
  return actor;
};

module.exports = mongoose.model('Actor', schema);
