const path = require('path');
const loopback = require('loopback');
const boot = require('loopback-boot');
const app = module.exports = loopback();
const webpack = require('webpack');

const publicPath = path.resolve(__dirname, '../client');
const webpackConfig = require('./../webpack.config');
const compiler = webpack(webpackConfig);

const webpackDevMiddleware = require("webpack-dev-middleware");

app.use(webpackDevMiddleware(compiler, {
	noInfo: false,
        publicPath: webpackConfig.output.publicPath	  
}));

app.use(require('webpack-hot-middleware')(compiler));

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(loopback.static(path.resolve(__dirname, '../client')));

app.on('error', (e) => {
  //console.error(e);
});

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
