var mongoose = require( 'mongoose' );


var lessonReviewSchema = new mongoose.Schema({
	author: String,
	rating: {type: Number, min:0, max:0},
	reviewText: String,
	createdOn: {type: Date, "default": Date.now}
});

var lessonSchema = new mongoose.Schema({ 
	name: {type: String, required: true},
	link_doc: String,
	link_plan: String,
	description: String,
	reviews: [lessonReviewSchema]
	});
	

mongoose.model('lessonplans', lessonSchema);