module.exports = function() {
  return function logError(err, req, res) {
    console.error('err ->', req.url, err);
    res.status(err.status);
    res.send(null);
  };
};
