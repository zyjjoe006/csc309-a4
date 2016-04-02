var mongoose = require('mongoose');
 
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

module.exports = mongoose.model('User',{
    username: String,
    password: String,
    email: String,
    gender: String,
    address: String,
	education: [
        {
        school: String,
        program: String,
        degree: String,
        year: Number
      }],
	    experience: [
        {
        job_title: String,
        description: String,
        rating: Number,
        comment: String
      }
      ],
	   type: Boolean,
	   projects: [{type: ObjectId, ref:'Posting'}]
});