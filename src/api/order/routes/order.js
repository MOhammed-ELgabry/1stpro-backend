// 'use strict';



// const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = createCoreRouter('api::order.order');

// 'use strict';

// module.exports = {
//   routes: [
//     {
//       method: 'GET',
//       path: '/orders/create-checkout-session',
//       handler: 'order.createCheckoutSession',
//       config: {
//         auth: false,
//       },
//     },
//   ],
// };


'use strict';

/**
 * order router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::order.order');
