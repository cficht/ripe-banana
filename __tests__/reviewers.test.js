const { getReviewers, getReviewer } = require('../db/data-helpers');

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

 
});
