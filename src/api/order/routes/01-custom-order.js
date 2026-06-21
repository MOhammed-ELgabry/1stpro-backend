'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/orders/create-checkout-session',
      handler: 'order.createCheckoutSession',
      config: {
        auth: false,
      },
    },
  ],
};