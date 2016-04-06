var Users = require('../models/User');

exports.isAdmin = function (req, res, next) {
	//if a user is not a project owner or an admin, he is restricted to access some routes
	if ((req.user.usertype == 3))
		return next();
	// if the user is not authorized then redirect him to home page
	req.flash('message', 'attempted accessing restricted project owner area ');
	return res.redirect('/');
}

/**
 * GET all users from admin page
 */
exports.getAllUsers = function(req, res) {
    Users.find( function (err, users) {
    if (err) return next(err);
    //res.json(postings);
    res.render('allusers', {user: req.user,
    	allusers: users});
  });
};

/**
 * Delete a user from admin controll
 */
exports.deleteUser = function(req, res) {
    Users.findByIdAndRemove(req.query.id, req.body, function (err, users) {
    if (err) return next(err);
    res.redirect('/admin')
  });
};

exports.editAccount = function(req, res) {
Users.findById(req.query.id, function (err, target) {
  res.render('account/profile', {
    title: 'Account Management', 'user': target
  });
});
};