'use strict';

const { isNull } = require("lodash");
/**
 *  location controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const locationUID = 'api::location.location';
const chargerUID = 'api::charger.charger';
const errorResponse = {
  key: 'locationNo',
  message: 'ErrorMessage-locationNo-isExist-text'
}

module.exports = createCoreController(locationUID, ({strapi}) => ({
    async update(ctx) {
      const { body } = ctx.request;
      const { id, locationNo } = body;
      const existingLocation = await strapi.db.query(locationUID).findOne({ where: { id }});
      if (existingLocation.locationNo !== locationNo) {
        const isLocationNoExist = await strapi.db.query(locationUID).findOne({ where: { locationNo }});
        if (isLocationNoExist) {
          return { data: { error: errorResponse } }
        }
      }

      //save charger first, get charger ID and map body then use body as param for update

      const updateResponse = await strapi.db.query(locationUID).update({ where: { id }, data: {...body} });
      console.log(updateResponse)

      return {
        data: {
          updateResponse,
          error: null
        }
      };
    },
    async create(ctx) {
      const { body } = ctx.request;
      const { chargers = [], locationNo } = body;

      const isExist = await strapi.db.query(locationUID).findOne({ where: { locationNo }});
      if (isExist) {
        return { data: { error: errorResponse } }
      }

      const savedChargers = await Promise.all(chargers.map(async (charger) => {
        const { id } = await strapi.db.query(chargerUID).create({ data: charger });
        return id.toString();
      }));

      const bodyPayload = {
        ...body,
        chargers: savedChargers
      };

      const savedLocation = await strapi.db.query(locationUID).create({ data: bodyPayload });

      savedChargers.forEach((id) => {
        strapi.db.query(chargerUID).update({
        where: { id },
        data: {
          locationId: savedLocation.id
        }});
      });

      return {
        data: {
          savedLocation,
          error: null
        }
      };
    }
  })
);
