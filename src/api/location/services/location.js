'use strict';

/**
 * location service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

const apiUid = 'api::location.location';

module.exports = createCoreService(apiUid)
