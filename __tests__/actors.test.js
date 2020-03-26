const { getActors } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('studios routes', () => {

  it('creates an actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Bob Robson',
        dob: new Date,
        pob: 'Portland'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Bob Robson',
          dob: expect.any(String),
          pob: 'Portland',
          __v: 0
        });
      });
  });

  it('gets all actors', async() => {
    const actors = await getActors();

    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        expect(res.body).toEqual(actors);
      });
  });

});
