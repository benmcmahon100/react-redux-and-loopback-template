module.exports = function(app) {
  const Role = app.models.Role;
  const user = app.models.user;

  Role.registerResolver('admin', (role, context, cb) => {
    let userId = context.accessToken.userId;
    if (!userId) {
      return process.nextTick(() => cb(null, false));
    }

    return user.findById(userId, (err, userInstance) => {
      if (err) {
        console.error(err);
      }
      return userInstance.roles((err, roles) => {
        if (err) {
          console.error(err);
        }

        if (roles.map(curRole => curRole.name).includes(role)) {
          return process.nextTick(() => cb(null, true));
        }
        else {
          return process.nextTick(() => cb(false, true));
        }
      });
    });
  });
};
