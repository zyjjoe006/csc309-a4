var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/user.js');

//get all users 
router.get('/', function(req, res, next) {
  User.find(function (err, user) {
    if (err) return next(err);
    res.json(user);
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