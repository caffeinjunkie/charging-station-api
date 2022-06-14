'use strict';

const { isNull } = require('lodash');
/**
 *  charger controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const apiUID = 'api::charger.charger';

module.exports = createCoreController(apiUID, ({strapi}) => ({
  async findOne(ctx) {
    const { type, serialNumber } = ctx.params;

    const charger = await strapi.db.query(apiUID).findOne({
      where: { type, serialNumber }
    });

    return {
      isExist: !isNull(charger)
    }
  }
}));
