'use strict';

const { isNull } = require("lodash");
/**
 *  location controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const locationUID = 'api::location.location';
const chargerUID = 'api::charger.charger';

module.exports = createCoreController(locationUID, ({strapi}) => ({
    async create(ctx) {
      const { body } = ctx.request;
      const { chargers = [], locationNo } = body;

      const isExist = await strapi.db.query(locationUID).findOne({ where: { locationNo }});
      if (isExist) {
        return {
          data: { error: {
            formKey: 'locationNo',
            messageKey: 'ErrorMessage-locationNo-required-text'
          }}
        }
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
