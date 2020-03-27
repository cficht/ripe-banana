const chance = require('chance').Chance();
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');

module.exports = async({ studiosToCreate = 10, actorsToCreate = 50, reviewersToCreate = 20, filmsToCreate = 150 } = {}) => {

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
  
  await Reviewer.create([...Array(reviewersToCreate)].map(() => ({
    name: chance.name(),
    company: chance.url()
  })));

  await Film.create([...Array(filmsToCreate)].map(() => ({
    title: `${chance.word()} ${chance.animal()}`,
    studio: chance.pickone(studios),
    released: chance.year(),
    cast: [...Array(10)].map(() => ({ role: `${chance.prefix()} ${chance.animal()}`, actor: chance.pickone(actors) }))    
  })));
};
