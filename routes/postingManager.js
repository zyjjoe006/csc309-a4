var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}


var mongoose = require('mongoose');
var Posting = require('../models/posting.js');

//get all visable postings
router.get('/viewAllPost', isAuthenticated, function(req, res, next) {
  Posting.find( function (err, postings) {
    if (err) return next(err);
    //res.json(postings);
    res.render('viewAllPostings', {user: req.user,
    	allpostings: postings});
  });
});

//get all postings belong to a user
router.get('/', isAuthenticated, function(req, res, next) {
  Posting.find({
	    '_id': { $in: req.user.projects}
	           },  function (err, postings) {
    if (err) return next(err);
    //res.json(postings);
    res.render('allpostings', { user: req.user,
    	allpostings: postings});
  });
});


//DONOT CALL IT
router.get('/testPosting', isAuthenticated, function(req, res, next) {
	Posting.create({
		title: 'RAD dev',
	    description: 'dev a project',
	    tags: ['java','C++'],
	    posting_date: new Date(),
	    start_date: null,
	    end_date: null,
		owner_email: req.user.email,
		developer_email: [null],
		status: 'posted',
		rating: null,
		comments: [null]
	}, function (err, post) {
	    if (err) return next(err);
	    res.json(post);
	  });
	});

//go to the post creation page
router.get('/createpost', isAuthenticated,  function(req, res){
	res.render('addpost',{message: req.flash('message')});
});

//join a posting
router.get('/joinpost',isAuthenticated, function(req, res, next) {
	Posting.findById(req.query.id, req.body, function (err, post) {
	    if (err) return next(err);
	    if ((post.developer_email.indexOf(req.user.email) === -1)){
	    	post.developer_email.push(req.user.email);
	    }
	    if ((req.user.projects.indexOf(post._id) === -1)){
	    	req.user.projects.push(post._id);
	    }
	    req.user.save();
	    post.save();
	    res.redirect('/postingManager');
	  });
	});

router.get('/view_detail', isAuthenticated, function(req, res, next) {
	Posting.findById(req.query.id,  function (err, postings) {
	    if (err) return next(err);
	    //res.json(postings);
	    res.render('posting_detail', { user: req.user,
	    	thepost: postings});
	  });
	});


//create a posting
router.post('/comment', isAuthenticated, function(req, res, next) {
	Posting.findById(req.body.id, function (err, post) {
	    if (err) return next(err);
	    var newComment = {
		    	'comment_date' : new Date(), 'commenter_email' : req.user.email, 'content' : req.body.commentMessage};
	    console.log(req.body.id);
	    console.log(post.title);
	    post.comments.push(newComment);
	    
	    post.save();
	    res.render('posting_detail', { user: req.user,
	    	thepost: post});
	  });
	});

//create a posting
router.post('/createpost', isAuthenticated, function(req, res, next) {
  var newPost = new Posting(req.body);
  newPost.posting_date = new Date();
  newPost.owner_email = req.user.email;
  newPost.save( function (err, post) {
    if (err) return next(err);
    //add project to owner's project's list
    req.user.projects.push(newPost._id);
    req.user.save(function (err){
    	if (err) return next(err);
    })
    res.redirect('/postingManager');
  });
});

//Delete a post
router.get('/deletepost', isAuthenticated, function(req, res, next) {
	  console.log(req.query.id);
	  Posting.findByIdAndRemove(req.query.id, req.body, function (err, post) {
	    if (err) return next(err);
	    res.redirect('/postingManager');
	  });
	});

//search posting by infomation
router.get('/search', isAuthenticated, function(req, res, next) {
  var SearchKeyWord = new RegExp(req.query.id, "i");
  Posting.find({$or:[{title : {$regex : SearchKeyWord}},{description : {$regex : SearchKeyWord}},
                     {tags :  SearchKeyWord},
                     {owner_email : {$regex : SearchKeyWord}},
                     {developer_email : {$regex : SearchKeyWord}}]}, function (err, post) {
    if (err) return next(err);
    console.log(req.query);
    console.log(post);
    res.render('viewAllPostings', { user: req.user,
    	allpostings: post});
  });
});

//show posting by id
router.get('/find:id',isAuthenticated, function(req, res, next) {
  Posting.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.redirect('/postingManager');
  });
});

//update posting
router.post('/updatePosting',isAuthenticated, function(req, res, next) {
  Posting.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.redirect('/postingManager');
  });
});

//delete posting by ID
router.post('/delete:id', function(req, res, next) {
  Posting.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;