module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    const user = event.state?.user;

    if (user) {
      data.seller = user.id;
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;

    const user = event.state?.user;

    if (user) {
      data.seller = user.id;
    }
  },
};