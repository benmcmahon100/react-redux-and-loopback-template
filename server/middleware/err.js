module.exports = function() {
  return function logError(err, req, res, next) {
     console.error('err ->', req.url, err);
     res.status(err.status);
     res.send(null)
  };
}
