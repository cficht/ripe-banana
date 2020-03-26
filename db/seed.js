const chance = require('chance').Chance();
const Studio = require('../lib/models/Studio');

module.exports = async({ studiosToCreate = 10 } = {}) => {

  await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: chance.company(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })));

};
