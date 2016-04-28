var express = require('express');
var router = express.Router();

var isAuthenticated = function(req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    req.flash('message', 'Please login');
    return res.redirect('/login');
}

var isDeveloper = function(req, res, next) {
    //if a user is not a developer or an admin, he is restricted to access some routes
    console.log(req.user.usertype);
    if (!(req.user.usertype == 1))
        return next();
    // if the user is not authorized then redirect him to home page
    req.flash('message', 'attempted access restricted developer area ');
    return res.redirect('/');
}

var isProjectOwnder = function(req, res, next) {
    //if a user is not a project owner or an admin, he is restricted to access some routes
    if (!(req.user.usertype == 2))
        return next();
    // if the user is not authorized then redirect him to home page
    req.flash('message', 'attempted accessing restricted project owner area ');
    return res.redirect('/');
}

var isAdmin = function(req, res, next) {
    //if a user is not a project owner or an admin, he is restricted to access some routes
    if ((req.user.usertype == 3))
        return next();
    // if the user is not authorized then redirect him to home page
    req.flash('message', 'attempted accessing restricted project owner area ');
    return res.redirect('/');
}


var mongoose = require('mongoose');
var Posting = require('../models/posting.js');
var Users = require('../models/User.js');

//get all visable postings
router.get('/viewAllPost', isAuthenticated, function(req, res, next) {
    Posting.find(function(err, postings) {
        if (err) return next(err);
        //res.json(postings);
        res.render('viewAllPostings', {
            user: req.user,
            allpostings: postings
        });
    });
});

//get all postings belong to a user
router.get('/', isAuthenticated, function(req, res, next) {
    Posting.find({
        '_id': { $in: req.user.projects }
    }, function(err, postings) {
        if (err) return next(err);
        //res.json(postings);
        res.render('allpostings', {
            user: req.user,
            allpostings: postings,
            message: req.flash.message
        });
    });
});

//get  a user detail's
router.get('/user_detail', isAuthenticated, function(req, res, next) {
    Users.findOne({ 'email': req.query.email }, function(err, target) {
        if (err) return next(err);
        //res.json(postings);
        res.render('user_detail', {
            user: req.user,
            theuser: target
        });
    });
});

function intersect_safe(a, b) {
    var ai = 0,
        bi = 0;
    var result = [];

    while (ai < a.length && bi < b.length) {
        if (a[ai] < b[bi]) { ai++; } else if (a[ai] > b[bi]) { bi++; } else /* they're equal */ {
            result.push(a[ai]);
            ai++;
            bi++;
        }
    }
    return result;
}

var findScore = function(posting, user) {
    if (user.skills == undefined) {
        return 0;
    }
    console.log("in findstore")
    console.log(posting);
    console.log(user.skills);
    return intersect_safe(posting.tags.sort(), user.skills.sort()).length;
}
var findBestMatche = function(posting, users) {
        var arrayLength = users.length;
        var bestUser = users[0];
        var bestScore = 0;
        for (var i = 0; i < arrayLength; i++) {
            console.log("hi");
            var score = findScore(posting, users[i]);
            if (score >= bestScore) {
                bestScore = score;
                bestUser = users[i];
            }
            //Do something
        }
        console.log(bestScore);
        return { 'bestUser': bestUser, 'bestScore': bestScore };
    }
    //get all postings belong to a user
router.get('/recommend', isAuthenticated, isProjectOwnder, function(req, res, next) {
    Users.find({
        'usertype': 2
    }, function(err, users) {
        if (err) return next(err);
        Posting.findById(req.query.id, function(err, posting) {
            console.log('req.query.id in recommend:');
            console.log(req.query.id);
            var bestMatch = findBestMatche(posting, users);
            res.render('posting_detail', {
                user: req.user,
                recommend: bestMatch,
                thepost: posting
            });
        });
    });
});
router.get('/api/recommend', isAuthenticated, isProjectOwnder, function(req, res, next) {
    Users.find({
        'usertype': 2
    }, function(err, users) {
        if (err) return next(err);
        Posting.findById(req.query.id, function(err, posting) {
            var bestMatch = findBestMatche(posting, users);
            console.log('best match developer:')
            console.log(bestMatch)
            res.json(bestMatch);
        });
    });
});

//go to the post creation page
router.get('/createpost', isAuthenticated, isProjectOwnder, function(req, res) {
    res.render('addpost', { message: req.flash('message') });
});

//join a posting
router.get('/joinpost', isAuthenticated, isDeveloper, function(req, res, next) {
    Posting.findById(req.query.id, req.body, function(err, post) {
        if (err) return next(err);
        if ((post.developer_email.indexOf(req.user.email) === -1)) {
            post.developer_email.push(req.user.email.toLowerCase());
        }
        if ((req.user.projects.indexOf(post._id) === -1)) {
            req.user.projects.push(post._id);
        }
        req.user.save();
        post.save();
        res.render('posting_detail', {
            user: req.user,
            thepost: post,
            message: req.flash('success', { msg: 'You have Joined this Project posting' })
        });
    });
});

router.get('/unjoin', isAuthenticated, isDeveloper, function(req, res, next) {
    Posting.findById(req.query.id, req.body, function(err, post) {
        if (err) return next(err);
        var index = post.developer_email.indexOf(req.user.email);
        if (!(index === -1)) {
            post.developer_email.splice(index, 1);
        }
        index = req.user.projects.indexOf(post._id);
        if (!(index === -1)) {
            req.user.projects.splice(index, 1);
        }
        req.user.save();
        post.save();
        res.redirect('/postingManager');
    });
});

router.get('/view_detail', isAuthenticated, function(req, res, next) {
    Posting.findById(req.query.id, function(err, postings) {
        if (err) return next(err);
        //res.json(postings);
        res.render('posting_detail', {
            user: req.user,
            thepost: postings
        });
    });
});
router.get('/api/view_detail', isAuthenticated, function(req, res, next) {
    console.log("open view_detail api successfully")
    Posting.findById(req.query.id, function(err, postings) {
        if (err) return next(err);
        res.json(postings);
    });
});

router.get('/edit_posting', isAuthenticated, isProjectOwnder, function(req, res, next) {
    Posting.findById(req.query.id, function(err, postings) {
        if (err) return next(err);
        //res.json(postings);
        res.render('editPosting', {
            user: req.user,
            thepost: postings
        });
    });
});


//comment on a posting
router.post('/comment', isAuthenticated, function(req, res, next) {
    Posting.findById(req.body._id, function(err, post) {
        if (err) return next(err);
        var newComment = {
            'comment_date': new Date(),
            'commenter_email': req.user.email,
            'content': req.body.commentMessage
        };
        console.log(req.body._id);
        console.log(post.title);
        post.comments.push(newComment);

        post.save();

        res.render('posting_detail', {
            user: req.user,
            thepost: post,
            message: req.flash('success', { msg: 'a new commented is posted' })
        });
    });
});


//rate a posting
router.post('/vote', isAuthenticated, isDeveloper, function(req, res, next) {
    Posting.findById(req.body._id, function(err, post) {
        if (err) return next(err);
        console.log(req.body.vote);
        if ((post.has_voted.indexOf(req.user.email) == -1)) {
            if (req.body.vote == 1) {
                post.rating++;
                post.has_voted.push(req.user.email);
            } else if (req.body.vote == 2) {
                post.rating--;
                post.has_voted.push(req.user.email);
            }
            post.save();
        }
        console.log(req.user);

        res.render('posting_detail', {
            user: req.user,
            thepost: post,
            message: req.flash('success', { msg: 'You have voted this project posting' })
        });
    });
});

//create a posting
router.post('/createpost', isAuthenticated, isProjectOwnder, function(req, res, next) {
    console.log(req.body.tags);
    var newPost = new Posting(req.body);
    newPost.posting_date = new Date();
    newPost.owner_email = req.user.email;
    newPost.status = 'posted';
    newPost.rating = 0;
    newPost.save(function(err, post) {
        if (err) return next(err);
        //add project to owner's project's list
        req.user.projects.push(newPost._id);
        req.user.save(function(err) {
            if (err) return next(err);
        })
        res.render('posting_detail', {
            user: req.user,
            thepost: newPost,
            message: req.flash('success', { msg: 'You have created this Project posting' })
        });
    });
});

//Delete a post
router.get('/deletepost', isAuthenticated, isProjectOwnder, function(req, res, next) {
    
    Posting.findByIdAndRemove(req.query.id, req.body, function(err, post) {
        if (err) return next(err);
        res.redirect('/postingManager');
    });
});

//search posting by infomation
router.get('/search', isAuthenticated, function(req, res, next) {
    var SearchKeyWord = new RegExp(req.query.id, "i");
    Posting.find({
        $or: [{ title: { $regex: SearchKeyWord } }, { description: { $regex: SearchKeyWord } },
            { tags: SearchKeyWord },
            { owner_email: { $regex: SearchKeyWord } },
            { developer_email: { $regex: SearchKeyWord } }
        ]
    }, function(err, post) {
        if (err) return next(err);
        console.log(req.query);
        console.log(post);
        res.render('viewAllPostings', {
            user: req.user,
            allpostings: post
        });
    });
});



//show posting by id
router.get('/find:id', isAuthenticated, function(req, res, next) {
    Posting.findById(req.params.id, function(err, post) {
        if (err) return next(err);
        res.redirect('/postingManager');
    });
});

//update posting
router.post('/updatePosting', isAuthenticated, function(req, res, next) {
    console.log("req.body._id:");
    console.log(req.body._id);
    console.log("req.body:");
    console.log(req.body);
    Posting.findByIdAndUpdate(req.body._id, req.body, function(err, post) {
        if (err) return next(err);
        console.log(post);
        res.redirect('/postingManager');
    });
});

//delete posting by ID
router.post('/delete:id', function(req, res, next) {

    Posting.findByIdAndRemove(req.body._id, req.body, function(err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


module.exports = router;
