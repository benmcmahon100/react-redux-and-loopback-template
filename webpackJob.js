var webpack = require("webpack");
const wc = require('./webpack.config.js');

const log = console.log;
const comp = webpack(wc);

comp.watch({
  aggregateTimeout: 300
}, function(err, stats) {
  if (err) {
    log('err:\n', err);
  }
  if (
    stats
    && stats.compilation.errors
    && stats.compilation.errors.length > 0
  ) {
    log('stats:\n');
    stats.compilation.errors.forEach((error) => {
      log(error.message);
    })
  }
  log("Webpack Done!");
});
