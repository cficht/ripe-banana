const chance = require('chance').Chance();
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
const Review = require('../lib/models/Review');

module.exports = async({ studiosToCreate = 10, actorsToCreate = 50, reviewersToCreate = 10, filmsToCreate = 150, reviewsToCreate = 200 } = {}) => {
  const studioTypes = ['Pictures', 'Studios', 'Films'];
  const studios = await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: `${chance.animal()} ${chance.pickone(studioTypes)}`,
    address: {
      city: chance.province({ full: true }),
      state: chance.state(),
      country: chance.country({ full: true })
    }
  })));

  const actors = await Actor.create([...Array(actorsToCreate)].map(() => ({
    name: chance.name(),
    dob: chance.birthday({ string: true }),
    pob: chance.country({ full: true })
  })));
  
  const reviewers = await Reviewer.create([...Array(reviewersToCreate)].map(() => ({
    name: chance.name(),
    company: chance.company()
  })));

  const romanNumerals = ['1', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
  const films = await Film.create([...Array(filmsToCreate)].map(() => ({
    title: `The ${chance.animal()} and the ${chance.profession()} ${chance.pickone(romanNumerals)}`,
    studio: chance.pickone(studios),
    released: chance.year({ min: 1900, max: 2020 }),
    cast: [...Array(10)].map(() => ({ role: `${chance.prefix({ full: true })} ${chance.animal()} ${chance.suffix({ full: true })}`, actor: chance.pickone(actors) }))    
  })));

  await Review.create([...Array(reviewsToCreate)].map(() => ({
    rating: chance.integer({ min: 1, max: 5 }),
    reviewer: chance.pickone(reviewers),
    review: chance.sentence({ words: 10 }),
    film: chance.pickone(films),
  })));
  
};
