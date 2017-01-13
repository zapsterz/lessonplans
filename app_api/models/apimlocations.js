var mongoose = require( 'mongoose' );

//a subsidiary schema - used in lessonSchema
var lessonReviewSchema = new mongoose.Schema({
	reviewId: mongoose.Schema.Types.ObjectId,
	author: String,
	rating: {type: Number, min:0, max:10, "default":0},
	reviewText: String,
	createdOn: {type: Date, "default": Date.now}
});

//main schema - using lessonReviewSchema for subsidiary document for reviews
var lessonSchema = new mongoose.Schema({ 
	name: {type: String, required: true},
	topic: {type: String, required: true},
	level: {type: String, required: true},
	link_doc: String,
	link_plan: String,
	link_plan_pdf: String,
	ext: String,
	description: String,
	tags: [String],
	averagereview: {type: Number, min:0, max:10, "default":0},
	reviews: [lessonReviewSchema]
	});
	

//Collection name, schema for collection
mongoose.model('lessons', lessonSchema);