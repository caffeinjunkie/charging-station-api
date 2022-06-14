'use strict';

/**
 * mock service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::mock.mock', ({ strapi }) =>  ({
  // Method 1: Creating an entirely custom service
  async exampleService(...args) {
    let response = { okay: true }

    if (response.okay === false) {
      return { response, error: true }
    }

    return response
  },

  // Method 2: Wrapping a core service (leaves core logic in place)
  async find(...args) {
    // Calling the default core controller
    const { results, pagination } = await super.find(...args);
    // some custom logic
    const chargers = await strapi.service('api::charger-type.charger-type').find();

    results.forEach(result => {
      result.counter = 1;
    });
    console.log(chargers, 'chh')
    console.log(results, 'moo')

    return { results, pagination };
  },

  // Method 3: Replacing a core service
  async findOne(entityId, params = {}) {
    return strapi.entityService.findOne('api::mock.mock', entityId, this.getFetchParams(params));
  }
}));
