const { getFilms } = require('../db/data-helpers');
const mongoose = require('mongoose');

const request = require('supertest');
const app = require('../lib/app');

describe('films routes', () => {
  
  it('creates a film', () => {
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'An Extremely Goofy Movie',
        studio: new mongoose.Types.ObjectId(),
        released: 1995,
        cast: [
          { role: 'Goofy', actor: new mongoose.Types.ObjectId() },
          { role: 'Max', actor: new mongoose.Types.ObjectId() }
        ]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'An Extremely Goofy Movie',
          studio: expect.any(String),
          released: 1995,
          cast: [
            { _id: expect.any(String), role: 'Goofy', actor: expect.any(String) },
            { _id: expect.any(String), role: 'Max', actor: expect.any(String) }
          ],
          __v: 0
        });
      });
  });

  it('gets all films', async() => {
    const films = await getFilms();

    return request(app)
      .get('/api/v1/films')
      .then(res => {
        films.forEach(film => {
          delete film.__v;
          delete film.cast;
          expect(res.body).toContainEqual({ ...film, studio: expect.any(Object) });
        });
      });
  });

});
