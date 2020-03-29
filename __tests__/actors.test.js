const { getActor, getActors, getFilms } = require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

describe('actors routes', () => {
  
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
        actors.forEach(actor => {
          delete actor.__v;
          delete actor.dob;
          delete actor.pob;
          expect(res.body).toContainEqual(actor);
        });
      });
  });

  it('gets an actor by id', async() => {
    const actor = await getActor();
    const films = await getFilms();
    let actorFilms = [];
    films.forEach(film => {
      film.cast.forEach(member => {
        if(member.actor === actor._id) {
          delete film.cast;
          delete film.studio;
          delete film.__v;
          actorFilms.push(film);
        }
      });
    });
    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        delete actor.__v;
        expect(res.body).toEqual({ ...actor, films: actorFilms });
      });
  });
  
});
