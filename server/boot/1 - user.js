/**
 * Created by Ben on 14/03/2017.
 */

module.exports = function(app) {
  const user = app.models.user;
  const Role = app.models.Role;
  const RoleMapping = app.models.RoleMapping;
  let router = app.loopback.Router();
  
  RoleMapping.belongsTo(user);
  user.hasMany(RoleMapping, {foreignKey: 'principalId'});
  Role.hasMany(user, {through: RoleMapping, foreignKey: 'roleId'});

  user.findOrCreate(
    {
      username: 'admin'
    },
    {
      email: 'admin@admin.com',
      password: 'admin',
      nonDefaultPassword: false,
      username: 'admin',
    },
    (err, results) => {
      if (err) {
        throw err;
      }

      console.log(results);
      Role.findOrCreate({
        name: 'admin'
      }, function(err, role) {
        if (err) {
          throw err;
        }

        role.principals({principalId: results.id}, (err, principals) => {
          if (err) {
            console.error(err);
          }

          if (principals.length === 0) {
            // make default admin user an admin
            role.principals.create({
              principalType: RoleMapping.user,
              principalId: results.id
            }, function(err, principal) {
              if (err) {
                throw err;
              }

              console.log('Created principal:', principal);

              console.log('\n', principal.id === results.id, '\n');

            });
          }
          else {
            console.log('Found principals:', principals);
          }
        });
      });
    }
  );

  router.post('/login', function(req, res) {
    user.login({
      email: req.body.email,
      password: req.body.password
    }, 'user', function(err, accessToken) {
      if (err) {
        console.error(err);
        return res.status(401).json({e: err, d: null});
      }

      if (accessToken !== null) {
        if (accessToken.id !== null) {
          console.log(accessToken.id);
          res.cookie('access_token', accessToken.id, {
            signed: !!req.signedCookies,
            maxAge: 1000 * accessToken.ttl
          });
          res.cookie('userid', accessToken.__data.user.id, {
            signed: !!req.signedCookies,
            maxAge: 1000 * accessToken.ttl
          });
        }
      }
      return res.redirect('/admin/amILoggedIn');
    });
  });

  app.use('/user', router);
};
