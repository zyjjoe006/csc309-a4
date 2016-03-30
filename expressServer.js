var express = require('express');
var app = express();
app.use('/fonts', express.static('fonts'));
app.use('/js', express.static('js'));
app.use('/css', express.static('css'));
app.use('/img', express.static('img'));
 var mongoose = require('mongoose'),


models = require('./models'),
    Posting,
    User,
    LoginToken;

models.defineModels(mongoose, function() {
    app.Posting = Posting = mongoose.model('Posting');
    app.User = User = mongoose.model('User');
    app.LoginToken = LoginToken = mongoose.model('LoginToken');
    mongoose.connect('mongodb://localhost:27017');
})

// FindProjectWithID[GET]
// Read document
// app.get('/api/project_detail/id=*', function(req, res, next) {
//     Posting.findOne({ _id: req.url.substring(23) }, function(err, d) {
//     if (!d) return next(new NotFound('Posting not found'));

//     switch (req.params.format) {
//       case 'json':
//         res.send(d.toObject());
//       break;

//       case 'html':
//         res.send(markdown.toHTML(d.data));
//       break;

//       default:
//         res.render('documents/show.jade', {
//           locals: { d: d, currentUser: req.currentUser }
//         });
//     }
//   });
// });

// CreatePosting[PUT]
var Posting = mongoose.model('User', Posting);
app.put('/createPosting', function(req, res) {
    var posting = new Posting({ 
        title: req.query.title,
        description: req.query.description,
        tags: req.query.tags,
        keywords: req.query.keywords
    });
    // Save it to the DB.
    posting.save(function(err) {
        if (err) {
            res.status(500).send(err);
            console.log(err);
            return;
        }
        // If everything is OK, then we return the information in the response.
        res.send(posting);
    });
});

// CreateUser[PUT]
var User = mongoose.model('User', User);
app.put('/api/createUser', function(req, res) {
    console.log("get a new user");
    var user = new User({ 
        userName: req.query.userName,
        password: req.query.password,
        email: req.query.email,
        salt:req.query.salt,
        education: [{
            school: req.query.school,
            program: req.query.program,
            degree: req.query.degree,
            year: req.query.year
        }],
        experience: [{
            job_title: req.query.userName,
            description: req.query.description,
            rating: req.query.rating,
            comment: req.query.comment
        }],
        type: Boolean
    });
    // Save it to the DB.
    user.save(function(err) {
        if (err) {
            res.status(500).send(err);
            console.log(err);
            return;
        }
        // If everything is OK, then we return the information in the response.
        res.send(user);
        console.log("sign up succeed");
    });
});


// load data, dirctly use json for now
var data_json=require('./data.json');
var user_json=require('./user.json');

var server = app.listen(3000, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Server running at at http://%s:%s", host, port)
})

// This responds with "Hello World" on the homepage
app.get('/', function(req, res) {
    console.log("Got a GET request for the homepage");
    res.sendFile(__dirname + "/home.html");
})

app.get('/*.html', function(req, res) {
    console.log(__dirname);
    console.log(req.url);
    res.sendFile(__dirname + "/" + req.url);
})


// This responds a GET request for data.json
// app.get('/data.json', function(req, res) {
//     console.log("Got a GET request for /data.json");
//     console.log(__dirname);
//     res.json(data_json);
// })

// get project list
app.get('/api/project_list', function(req, res) {
    console.log("Got a GET request for project list");
    data=[];
    data_json.forEach(function(project){
        var element={};
        element["name"]=project.name;
        element["status"]=project.status;
        element["publisher"]=project.publisher;
        element["publishDate"]=project.publishDate;
        element["id"]=project.id;
        element["id_str"]=project.id_str;
        element["publisherId"]=project.publisherId;
        element["publisherId_str"]=project.publisherId_str;
        data.push(element);
    });
    res.json(data);
    
})

// get project detail
app.get('/api/project_detail/id=*', function(req, res) {
    id=req.url.substring(23);
    console.log("Got a GET request for the project with id:"+id);
    var aimid = data_json.filter(function(project) {
        return project.id == id;
    });
    var data = [];
    if (typeof aimid[0] !== 'undefined') {
        data = aimid[0];
        res.json(data);
    } else {
       res.status(500).json({ error: 'id not found' });
    }
    
    
});

app.get('/api/profile_detail/id=*', function(req, res) {
    id=req.url.substring(23);
    console.log("Got a GET request for the profile with id:"+id);
    var aimid = user_json.filter(function(profile) {
        return profile.id == id;
    });
    var data = [];
    if (typeof aimid[0] !== 'undefined') {
        data = aimid[0];
        res.json(data);
    } else {
       res.status(500).json({ error: 'id not found' });
    }
    
    
});

app.all('/*',function(req,res){
       res.sendFile(__dirname + "/home.html");
});

