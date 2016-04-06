var mongoose = require('mongoose');
 
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
	
module.exports = mongoose.model('Posting',{
    title: String,
    description: String,
    tags: [String],
	posting_date: Date,
    start_date: Date,
    end_date: Date,
	owner_email: String,
	developer_email: [String],
	has_voted:[String],
	status: String,
	rating: Number,
	comments: [{
		comment_date: Date,
		commenter_email: String,
		content: String
	}]
});
