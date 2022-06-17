'use strict';

const { isNull } = require('lodash');
/**
 *  charger controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const chargerUID = 'api::charger.charger';

module.exports = createCoreController(chargerUID, ({strapi}) => ({
  async findOne(ctx) {
    const { type, serialNumber } = ctx.params;

    const charger = await strapi.db.query(chargerUID).findOne({
      where: { type, serialNumber }
    });

    return {
      isExist: !isNull(charger)
    }
  },
  async create(ctx) {
    const { body: { type, status, serialNumber } } = ctx.request;
    const requestBody = {
      type: type.name,
      status: status.name,
      serialNumber
    }

    const response = await strapi.db.query(chargerUID).create({ data: requestBody });
    console.log(response)

    return {
      data: response
    };
  },
  async update(ctx) {
    const { body: { id, type, status, serialNumber } } = ctx.request;
    const requestBody = {
      type: type.name,
      status: status.name,
      serialNumber
    }

    const response = await strapi.db.query(chargerUID).update({ where: { id }, data: requestBody });

    return {
      data: response
    };
  },
  async delete(ctx) {
    const { body: { chargers } } = ctx.request;

    return Promise.all(chargers.map(async (charger) => {
      await strapi.db.query(chargerUID).delete({ where: { id: charger.id } });
    }));
  },
}));
