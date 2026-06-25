
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

//         // ======================
//         // SERVER-SIDE TOTAL VALIDATION
//         // ======================
//         let calculatedTotal = 0;

//         for (const item of cartItems) {
//           const book = await strapi.entityService.findOne(
//             "api::book.book",
//             item.book
//           );

//           if (!book) {
//             return ctx.badRequest("Book not found");
//           }

//           calculatedTotal += book.price * item.quantity;
//         }

//         // Shipping
//         calculatedTotal += 10;

//         console.log("Frontend Total:", total);
//         console.log("Backend Total:", calculatedTotal);

//         if (Number(total) !== Number(calculatedTotal)) {
//           return ctx.badRequest("Order total mismatch");
//         }

//         const sessionId = `sess_${Date.now()}`;

//         const order = await strapi.entityService.create(
//           "api::order.order",
//           {
//             data: {
//               users_permissions_user: user.id,
//               items: cartItems,
//               total: calculatedTotal,
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

//     async confirmPayment(ctx) {
//       try {
//         const { sessionId } = ctx.request.body;

//         if (!sessionId) {
//           return ctx.badRequest("Session ID is required");
//         }

//         const orders = await strapi.entityService.findMany(
//           "api::order.order",
//           {
//             filters: {
//               sessionId,
//             },
//           }
//         );

//         if (!orders.length) {
//           return ctx.notFound("Order not found");
//         }

//         // Idempotency Guard
//         if (orders[0].paymentStatus === "paid") {
//           return {
//             success: true,
//             message: "Payment already confirmed",
//           };
//         }

//         await strapi.entityService.update(
//           "api::order.order",
//           orders[0].id,
//           {
//             data: {
//               paymentStatus: "paid",
//             },
//           }
//         );

//         return {
//           success: true,
//           message: "Payment confirmed",
//         };

//       } catch (err) {
//         console.log(err);
//         return ctx.badRequest(err.message);
//       }
//     },

//   })
// );

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

//         const {
//           cartItems,
//           total,
//           address,
//           phone,
//           cardName,
//           cardNumber,
//           expiry,
//           cvv,
//         } = ctx.request.body;

//         if (!cartItems?.length) {
//           return ctx.badRequest("Cart is empty");
//         }

//         // ======================
//         // CARD VALIDATION
//         // ======================

//         if (!cardName?.trim()) {
//           return ctx.badRequest("Card holder name is required");
//         }

//         if (!/^\d{16}$/.test(String(cardNumber).trim())) {
//           return ctx.badRequest("Card number must be 16 digits");
//         }

//         if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
//           return ctx.badRequest("Expiry must be MM/YY");
//         }

//         if (!/^\d{3}$/.test(String(cvv).trim())) {
//           return ctx.badRequest("CVV must be 3 digits");
//         }

//         // ======================
//         // SERVER-SIDE TOTAL VALIDATION
//         // ======================

//         let calculatedTotal = 0;

//         for (const item of cartItems) {
//           const book = await strapi.entityService.findOne(
//             "api::book.book",
//             item.book
//           );

//           if (!book) {
//             return ctx.badRequest("Book not found");
//           }

//           calculatedTotal += book.price * item.quantity;
//         }

//         // Shipping
//         calculatedTotal += 10;

//         console.log("Frontend Total:", total);
//         console.log("Backend Total:", calculatedTotal);

//         if (Number(total) !== Number(calculatedTotal)) {
//           return ctx.badRequest("Order total mismatch");
//         }

//         const sessionId = `sess_${Date.now()}`;

//         const order = await strapi.entityService.create(
//           "api::order.order",
//           {
//             data: {
//               users_permissions_user: user.id,
//               items: cartItems,
//               total: Number(calculatedTotal),
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

//     async confirmPayment(ctx) {
//       try {
//         const { sessionId } = ctx.request.body;

//         if (!sessionId) {
//           return ctx.badRequest("Session ID is required");
//         }

//         const orders = await strapi.entityService.findMany(
//           "api::order.order",
//           {
//             filters: {
//               sessionId,
//             },
//           }
//         );

//         if (!orders.length) {
//           return ctx.notFound("Order not found");
//         }

//         // Idempotency Guard
//         if (orders[0].paymentStatus === "paid") {
//           return {
//             success: true,
//             message: "Payment already confirmed",
//           };
//         }

//         await strapi.entityService.update(
//           "api::order.order",
//           orders[0].id,
//           {
//             data: {
//               paymentStatus: "paid",
//             },
//           }
//         );

//         return {
//           success: true,
//           message: "Payment confirmed",
//         };

//       } catch (err) {
//         console.log(err);
//         return ctx.badRequest(err.message);
//       }
//     },

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

        const {
          cartItems,
          total,
          address,
          phone,
          cardName,
          cardNumber,
          expiry,
          cvv,
        } = ctx.request.body;

        if (!cartItems?.length) {
          return ctx.badRequest("Cart is empty");
        }

        // ======================
        // CARD VALIDATION
        // ======================

        if (!cardName?.trim()) {
          return ctx.badRequest("Card holder name is required");
        }

        if (!/^\d{16}$/.test(cardNumber)) {
          return ctx.badRequest("Card number must be 16 digits");
        }

        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
          return ctx.badRequest("Expiry must be MM/YY");
        }

        if (!/^\d{3}$/.test(cvv)) {
          return ctx.badRequest("CVV must be 3 digits");
        }

        // ======================
        // SERVER-SIDE TOTAL VALIDATION
        // ======================

        let calculatedTotal = 0;

        for (const item of cartItems) {
          const book = await strapi.entityService.findOne(
            "api::book.book",
            item.book
          );

          if (!book) {
            return ctx.badRequest("Book not found");
          }

          calculatedTotal += book.price * item.quantity;
        }

        calculatedTotal += 10; // Shipping

        console.log("Frontend Total:", total);
        console.log("Backend Total:", calculatedTotal);

        if (Number(total) !== Number(calculatedTotal)) {
          return ctx.badRequest("Order total mismatch");
        }

        const sessionId = `sess_${Date.now()}`;

        const order = await strapi.entityService.create(
          "api::order.order",
          {
            data: {
              users_permissions_user: user.id,
              items: cartItems,
              total: calculatedTotal,
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
        const user = ctx.state.user;

        if (!user) {
          return ctx.unauthorized("Login required");
        }

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
            populate: {
              users_permissions_user: true,
            },
          }
        );

        if (!orders.length) {
          return ctx.notFound("Order not found");
        }

        const order = orders[0];

        // ======================
        // OWNER CHECK
        // ======================

        if (
          !order.users_permissions_user ||
          order.users_permissions_user.id !== user.id
        ) {
          return ctx.forbidden("You cannot access this order");
        }

        // ======================
        // IDEMPOTENCY GUARD
        // ======================

        if (order.paymentStatus === "paid") {
          return {
            success: true,
            message: "Payment already confirmed",
          };
        }

        await strapi.entityService.update(
          "api::order.order",
          order.id,
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