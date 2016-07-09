'use strict';
const fs = require('fs');

const routesPath = __dirname + '/../routes.json';

module.exports = function(server) {
var router = server.loopback.Router();
  fs.accessSync(
    routesPath,
    fs.R_OK | fs.W_OK,
    (err) => {
      throw (err);
    }
  );

  var routesData =
    JSON.parse(
      fs.readFileSync(
        routesPath,
        'utf8'
      )
    );

  Object.keys(routesData).forEach((key) => {
    const data = routesData[key];
    switch (data.method.toLowerCase()) {
      case 'get':
        const routePath = data.path;
        let routeParams = {};

        Object.keys(data).filter((key) => {
          return([
            'path',
            'method',
            'render'
          ].indexOf(key.toLowerCase()) < 0)
        }).forEach((key) => {
          routeParams[key] = data[key];
        });

        router.get(routePath, (req, res) => {
          res.render(data.render, routeParams);
        });
        break;
      default:

    }
  });

  // Install a `/` route that returns server status
  server.use(router);
};
