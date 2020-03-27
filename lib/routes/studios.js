const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()
  .post('/', (req, res, next) => {
    Studio
      .create(req.body)
      .then(studio => res.send(studio))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Studio
      .find()
      .select('name')
      .then(studios => res.send(studios))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Studio
      .findById(req.params.id)
      .populate({ path: 'films', select: 'title -studio' })
      .select('name address films')
      .then(studio => res.send(studio))
      .catch(next);
  });
