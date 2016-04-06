/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  res.redirect('/postingManager');
};