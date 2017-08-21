require('dotenv').config();
const path = require('path');
const loopback = require('loopback');
const boot = require('loopback-boot');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const loopbackPassport = require('loopback-component-passport');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./../webpack.config');

const app = module.exports = loopback();

// let PassportConfigurator = loopbackPassport.PassportConfigurator;
// PassportConfigurator = new PassportConfigurator(app);
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: false,
  publicPath: webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

app.use(loopback.static(path.resolve(__dirname, '../client')));
app.use('/images', loopback.static(path.resolve(__dirname, '../uploadStore')));

// to support JSON-encoded bodies
// to support URL-encoded bodies
app.middleware('parse', bodyParser.json({
  bodyParser: true,
  urlencoded: true,
  extended: true
}));

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    let baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      let explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) {
    throw err;
  }

  app.middleware('auth', loopback.token({
    model: app.models.AccessToken,
    currentUserLiteral: 'me',
    searchDefaultTokenKeys: false,
    cookies: ['access_token'],
    headers: ['access_token', 'X-Access-Token'],
    params: ['access_token']
  }));

  app.middleware('session:before', cookieParser('secret'));
  app.middleware('session', session({
    secret: 'kitty',
    saveUninitialized: true,
    resave: true
  }));

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.start();
  }
});
