// 'use strict';

// /**
//  * order controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::order.order');


'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  'api::order.order',
  ({ strapi }) => ({
    
    async createCheckoutSession(ctx) {
      return {
        success: true,
        checkoutUrl:
          'http://localhost:5173/payment-success?session_id=mock_session_123',
      };
    },

  })
);