

// "use strict";

// const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController(
//   "api::order.order",
//   ({ strapi }) => ({

//     async createCheckoutSession(ctx) {
//       try {
//         console.log("🔥 BODY:", ctx.request.body);
//         console.log("USER:", ctx.state.user);

//         const user = ctx.state.user;

//         if (!user) {
//           return ctx.unauthorized("No user found");
//         }

//         const { cartItems, total, address, phone } = ctx.request.body;

//         if (!cartItems?.length) {
//           return ctx.badRequest("Cart is empty");
//         }

//         const sessionId = `sess_${Date.now()}`;

//         const order = await strapi.entityService.create(
//           "api::order.order",
//           {
//             data: {
//               users_permissions_user: user.id,
//               items: cartItems,
//               total,
//               address,
//               phone,
//               paymentMethod: "visa",
//               paymentStatus: "pending",
//               orderStatus: "pending",
//               sessionId,
//             },
//           }
//         );

//         console.log("🔥 CREATE CHECKOUT SESSION HIT");

//         return {
//           checkoutUrl: `http://localhost:5173/payment-success?session_id=${sessionId}`,
//           sessionId,
//           orderId: order.id,
//         };

//       } catch (err) {
//         console.log(err);
//         return ctx.badRequest(err.message);
//       }
//     },

// async confirmPayment(ctx) {
//   try {
//     const { sessionId } = ctx.request.body;

//     if (!sessionId) {
//       return ctx.badRequest("Session ID is required");
//     }

// const orders = await strapi.entityService.findMany(
//   "api::order.order",
//   {
//     filters: {
//       sessionId,
//     },
//   }
// );

// if (!orders.length) {
//   return ctx.notFound("Order not found");
// }

// return {
//   success: true,
//   order: orders[0],
// };
//   } catch (err) {
//     console.log(err);
//     return ctx.badRequest(err.message);
//   }
// },

//   })
// );

"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::order.order",
  ({ strapi }) => ({

    async createCheckoutSession(ctx) {
      try {
        console.log("🔥 BODY:", ctx.request.body);
        console.log("USER:", ctx.state.user);

        const user = ctx.state.user;

        if (!user) {
          return ctx.unauthorized("No user found");
        }

        const { cartItems, total, address, phone } = ctx.request.body;

        if (!cartItems?.length) {
          return ctx.badRequest("Cart is empty");
        }

        const sessionId = `sess_${Date.now()}`;

        const order = await strapi.entityService.create(
          "api::order.order",
          {
            data: {
              users_permissions_user: user.id,
              items: cartItems,
              total,
              address,
              phone,
              paymentMethod: "visa",
              paymentStatus: "pending",
              orderStatus: "pending",
              sessionId,
            },
          }
        );

        console.log("🔥 CREATE CHECKOUT SESSION HIT");

        return {
          checkoutUrl: `http://localhost:5173/payment-success?session_id=${sessionId}`,
          sessionId,
          orderId: order.id,
        };

      } catch (err) {
        console.log(err);
        return ctx.badRequest(err.message);
      }
    },

    async confirmPayment(ctx) {
      try {
        const { sessionId } = ctx.request.body;

        if (!sessionId) {
          return ctx.badRequest("Session ID is required");
        }

        const orders = await strapi.entityService.findMany(
          "api::order.order",
          {
            filters: {
              sessionId,
            },
          }
        );

        if (!orders.length) {
          return ctx.notFound("Order not found");
        }

        await strapi.entityService.update(
          "api::order.order",
          orders[0].id,
          {
            data: {
              paymentStatus: "paid",
            },
          }
        );

        return {
          success: true,
          message: "Payment confirmed",
        };

      } catch (err) {
        console.log(err);
        return ctx.badRequest(err.message);
      }
    },

  })
);