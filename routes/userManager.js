var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('./models/user.js');

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler 
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}

//get all users 
router.get('/', function(req, res, next) {
  User.find(function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

router.get('/user_detail', isAuthenticated, function(req, res, next) {
  Posting.find({'email' : req.query.email},function (err, theuser) {
    if (err) return next(err);
    //res.json(postings);
    res.render('user_detail', { user: req.user,
        theuser: theuser});
  });
});

router.get('/', function(req, res, next) {
  Posting.find(function (err, postings) {
    if (err) return next(err);
    //res.json(postings);
    res.render('allpostings', { user: req.user,
        allpostings: postings});
  });
});

router.get('/getUser', function(req, res){
    res.render('getuser',{message: req.flash('message')});
});

//get user by email
router.get('/searchUser', function(req, res, next) {
    User.findOne({email:req.query.email}, function (err, user) {
        console.log(req.query.email);
        if (err){
            return next(err);
        }
        console.log(user); 
        res.json(user);
    });
});


//update user by email
router.put('/updateUser', function(req, res, next) {
  User.findOneAndUpdate({email:req.params.email}, req.body, function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

//delete user by email
router.post('deleteUser/:email', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

module.exports = router;