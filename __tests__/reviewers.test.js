const { getReviewers, getReviewer, getReviews, getFilms } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('reviewers routes', () => {
  it('creates a reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Roger Ebert',
        company: 'Chicago Sun Times'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Roger Ebert',
          company: 'Chicago Sun Times',
          __v: 0
        });
      });
  });

  it('gets all reviewers', async() => {
    const reviewers = await getReviewers();
    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        reviewers.forEach(reviewer => {
          delete reviewer.__v;
          expect(res.body).toContainEqual(reviewer);
        });
      });
  });

  it('gets a reviewer by id', async() => {
    const reviewer = await getReviewer();
    delete reviewer.__v;
    const reviews = await getReviews({ reviewer: { $in: reviewer._id } });
    const films = await getFilms();
    reviews.forEach(review => {
      films.forEach(film => {
        if(film._id === review.film) {
          delete film.__v;
          delete film.cast;
          delete film.released;
          delete film.studio;
          delete review.__v;
          delete review.reviewer;
          review.film = film;
        }
      });
    });
    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({ ...reviewer, reviews: reviews });
      });
  });

  it('updates a reviewer company by id', async() => {
    const reviewer = await getReviewer();
    return request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .send({ company: 'Some New Place' })
      .then(res => {
        expect(res.body).toEqual({
          ...reviewer,
          company: 'Some New Place'
        });
      });
  });

  it('deletes a reviewer by id', async() => {
    const reviewer = await getReviewer();
    return request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual(reviewer);
      });
  });
});
