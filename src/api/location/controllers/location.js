'use strict';

/**
 *  location controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const locationUID = 'api::location.location';
const chargerUID = 'api::charger.charger';
const errorResponse = {
  key: 'locationNo',
  message: 'ErrorMessage-locationNo-isExist-text'
};

module.exports = createCoreController(locationUID, ({strapi}) => ({
  async delete(ctx) {
    const { id } = ctx.params;
    const populate = {
      chargers: {
        accessory: false
      }
    };

    const location = await strapi.db.query(locationUID).findOne({ where: { id }, populate });
    const { chargers } = location;
    await Promise.all(chargers.map(async (charger) => {
      await strapi.db.query(chargerUID).delete({ where: { id: charger.id } });
    }));

    return strapi.db.query(locationUID).delete({ where: { id } });
  },
  async update(ctx) {
    const { body } = ctx.request;
    const { id, locationNo, chargers } = body;
    const populate = {
      chargers: {
        accessory: false
      }
    };
    const existingLocation = await strapi.db.query(locationUID).findOne({ where: { id }, populate });
    if (existingLocation.locationNo !== locationNo) {
      const isLocationNoExist = await strapi.db.query(locationUID).findOne({ where: { locationNo }});
      if (isLocationNoExist) {
        return { data: { error: errorResponse } };
      }
    }

    const { chargers: existingChargers } = existingLocation;
    const removedChargers = existingChargers.filter(charger => !chargers.includes(charger.id.toString()));

    if (removedChargers.length > 0) {
      await Promise.all(removedChargers.map(async (charger) => {
        await strapi.db.query(chargerUID).delete({ where: { id: charger.id } });
      }));
    }

    const updateResponse = await strapi.db.query(locationUID).update({ where: { id }, data: body });
    console.log(updateResponse);

    return {
      data: {
        updateResponse,
        error: null
      }
    };
  },
  async create(ctx) {
    const { body } = ctx.request;
    const { locationNo } = body;

    const isExist = await strapi.db.query(locationUID).findOne({ where: { locationNo }});
    if (isExist) {
      return { data: { error: errorResponse } };
    }

    const savedLocation = await strapi.db.query(locationUID).create({ data: body });

    return {
      data: {
        savedLocation,
        error: null
      }
    };
  }
})
);
