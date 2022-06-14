'use strict';

/**
 * charger router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::charger.charger',
  {
    prefix: '',
    only: [ 'find', 'findOne' ],
    except: [],
    config: {
      find: {
        auth: false,
        policies: [],
        middlewares: [],
      },
      findOne: {},
      create: {},
      update: {},
      delete: {},
    }
  }
);
