module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      register: { allowedFields: ['firstName', 'lastName', 'phone', 'address'] },
      permissions: {
        user: {
          update: true,  // تفعيل صلاحية التحديث للمستخدم العادي
        },
      },
    },
  },
});