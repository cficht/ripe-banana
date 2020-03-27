const chance = require('chance').Chance();
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
const Review = require('../lib/models/Review');

module.exports = async({ studiosToCreate = 10, actorsToCreate = 50, reviewersToCreate = 20, filmsToCreate = 150, reviewsToCreate = 500 } = {}) => {

  const studios = await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: chance.company(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })));

  const actors = await Actor.create([...Array(actorsToCreate)].map(() => ({
    name: chance.name(),
    dob: chance.date(),
    pob: chance.city()
  })));
  
  const reviewers = await Reviewer.create([...Array(reviewersToCreate)].map(() => ({
    name: chance.name(),
    company: chance.url()
  })));

  const films = await Film.create([...Array(filmsToCreate)].map(() => ({
    title: `${chance.word()} ${chance.animal()}`,
    studio: chance.pickone(studios),
    released: chance.year(),
    cast: [...Array(10)].map(() => ({ role: `${chance.prefix()} ${chance.animal()}`, actor: chance.pickone(actors) }))    
  })));

  await Review.create([...Array(reviewsToCreate)].map(() => ({
    rating: chance.integer({ min: 1, max: 5 }),
    reviewer: chance.pickone(reviewers),
    review: chance.sentence({ words: 10 }),
    film: chance.pickone(films),
  })));
};
