// module.exports = {
//   routes: [
//     {
//       method: "POST",
//       path: "/orders/create-checkout-session",
//       handler: "order.createCheckoutSession",
//      config: {
//   auth: {
//     enabled: true
//   }
// }
//     }
//   ]
// }; 
module.exports = {
  routes: [
    {
      method: "POST",
      path: "/orders/create-checkout-session",
      handler: "order.createCheckoutSession",
      config: {
        auth: {
          enabled: true,
        },
      },
    },
    {
      method: "POST",
      path: "/orders/confirm-payment",
      handler: "order.confirmPayment",
      config: {
        auth: {
          enabled: true,
        },
      },
    },
  ],
};