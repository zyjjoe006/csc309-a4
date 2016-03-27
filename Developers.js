var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:12345/test', {
  user: 'Admin',
  pass: 'Admin'
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Connected to MongoDB');
});

var DeveloperSchema = mongoose.Schema({
  userName: {type: String, trim: true},
  password: {type: String, trim: true},
  email: {type: String, trim: true},
  education: [
    {
    school: String,
    program: String,
    degree: String,
    year: Number
  }
  ],
  experience: [
    {
    job_title: String,
    description: String,
    rating: Number,
    comment: String
  }
  ],
  account_data: Date,
  brief: String
});

var Developers = mongoose.model('Developers', DeveloperSchema);

router.get('/newDev', function(req, res) {
  var developer = new Developers({
  userName: req.query.userName,
  password: req.query.password,
  email: req.query.email,
  education: [
    {
    school: req.query.school,
    program: req.query.program,
    degree: req.query.degree,
    year: req.query.year
  }
  ],
  experience: [
    {
    job_title: req.query.userName,
    description: req.query.description,
    rating: req.query.rating,
    comment: req.query.comment
  }
  ],
  account_data:req.query.account_data,
  brief: req.query.brief
  });

  // Save it to the DB.
  developer.save(function(err) {
    if (err) {
      res.status(500).send(err);
      console.log(err);
      return;
    }

    // If everything is OK, then we return the information in the response.
    res.send(developer);
  });
});

// This should use POST but we use GET for brevity.
router.get('/findAllDevs', function(req, res) {
  Developers.find(function(err, developers) {
    if (err) {
      res.status(500).send(err);
      console.log(err);
      return;
    }

    // Send the books back to the user.
    res.send(developers);
  });
});

// This should use POST but we use GET for brevity.
router.get('/deleteDev/:id', function(req, res) {
  // Deletes a book using its ID.
  Developers.remove({_id: req.params.id}, function(err) {
    if (err) {
      res.status(500).send(err);
      console.log(err);
      return;
    }

    res.send('Deleted.');
  });
});

router.get('/findDev:id', function(req, res) {
  // Returns the information of a particular book.
  Developers.findById(req.params.id, function(err, developer) {
    if (err) {
      res.status(500).send(err);
      console.log(err);
      return;
    }

    // If the book is not found, we return 404.
    if (!developer) {
      res.status(404).send('Not found.');
      return;
    }

    // If found, we return the info.
    res.send(developer);
  });
});

module.exports = router;
