// "use strict";

// module.exports = {
//   googleLogin: async (ctx) => {
//     try {
//       const { email, username, avatar } = ctx.request.body;

//       if (!email) {
//         return ctx.badRequest("Email is required");
//       }

//       // 🔍 1. find user by email ONLY
//       let user = await strapi.db
//         .query("plugin::users-permissions.user")
//         .findOne({
//           where: { email },
//         });

//       // 🆕 2. create user if not exists
//       if (!user) {

//         // 🔥 get authenticated role
//         const authenticatedRole = await strapi
//           .query("plugin::users-permissions.role")
//           .findOne({
//             where: { type: "authenticated" },
//           });

//         user = await strapi
//           .plugin("users-permissions")
//           .service("user")
//           .add({
//             username: username || email.split("@")[0],
//             email,
//             confirmed: true,
//             provider: "google",
//             password: Math.random().toString(36),

//             // 🔥 IMPORTANT
//             role: authenticatedRole.id,
//           });
//       }

//       // 🔥 3. ALWAYS ensure ONE profile
//       let profile = await strapi.db
//         .query("api::profile.profile")
//         .findOne({
//           where: { users_permissions_user: user.id },
//         });

//       if (!profile) {
//         profile = await strapi.entityService.create(
//           "api::profile.profile",
//           {
//             data: {
//               firstName: username || "",
//               lastName: "",
//               phone: "",
//               address: "",
//               avatar: avatar || null,
//               users_permissions_user: user.id,
//             },
//           }
//         );
//       }

//       // 🔐 4. JWT (Access Token)
//       const accessToken = strapi
//         .plugin("users-permissions")
//         .service("jwt")
//         .issue({ id: user.id });

//       // 🔄 5. Fake Refresh Token
//       const refreshToken = Math.random()
//         .toString(36)
//         .substring(2);

//       return ctx.send({
//         jwt: accessToken,
//         refreshToken,
//         user: {
//   id: user.id,
//   documentId: user.documentId,
//   username: user.username,
//   email: user.email,
//   provider: user.provider,
//   confirmed: user.confirmed,
//   blocked: user.blocked,
//   profile,
// },
//       });

//     } catch (err) {
//       console.log(err);
//       return ctx.badRequest("Google login failed");
//     }
//   },
// };

//ما قبل اخر تعديل 

"use strict";

module.exports = {
  googleLogin: async (ctx) => {

    try {

      const {
        email,
        username,
        firebaseUid,
        googleAvatar,
      } = ctx.request.body;

      if (!email) {
        return ctx.badRequest(
          "Email is required"
        );
      }

      // ======================
      // FIND USER
      // ======================
      let user = await strapi.db
        .query(
          "plugin::users-permissions.user"
        )
        .findOne({
          where: { email },
        });

      // ======================
      // CREATE USER
      // ======================
      if (!user) {

        const authenticatedRole =
          await strapi
            .query(
              "plugin::users-permissions.role"
            )
            .findOne({
              where: {
                type: "authenticated",
              },
            });

        user = await strapi
          .plugin("users-permissions")
          .service("user")
          .add({

            username:
              username ||
              email.split("@")[0],

            email,

            confirmed: true,

            provider: "google",

            password: Math.random()
              .toString(36),

            role: authenticatedRole.id,
          });
      }

      // ======================
      // ENSURE PROFILE EXISTS
      // ======================
      let profile = await strapi.db
        .query("api::profile.profile")
        .findOne({
          where: {
            users_permissions_user:
              user.id,
          },

          populate: {
            avatar: true,
          },
        });

      // ======================
      // CREATE PROFILE
      // ======================
      if (!profile) {

        profile =
          await strapi.entityService.create(
            "api::profile.profile",
            {
              data: {

                firstName:
                  username || "",

                lastName: "",

                phone: "",

                address: "",

                // ❌ DON'T SAVE GOOGLE URL
                // avatar: googleAvatar

                users_permissions_user:
                  user.id,
              },

              populate: {
                avatar: true,
              },
            }
          );
      }

      // ======================
      // JWT
      // ======================
      const accessToken = strapi
        .plugin("users-permissions")
        .service("jwt")
        .issue({
          id: user.id,
        });

      // ======================
      // RESPONSE
      // ======================
      return ctx.send({

        jwt: accessToken,

        user: {
          id: user.id,

          documentId:
            user.documentId,

          username: user.username,

          email: user.email,

          provider: user.provider,

          confirmed:
            user.confirmed,

          blocked: user.blocked,

          profile,
        },
      });

    } catch (err) {

      console.log(err);

      return ctx.badRequest(
        "Google login failed"
      );
    }
  },
};