
var mongoose = require('mongoose');
var LDB = mongoose.model('lessons');
var User = mongoose.model('User');


var sendJsonResponse = function (res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.display_plan_reviews = function(req, res){
	if (req.params && req.params.plan_id) {
		
		LDB
			.findOne({
				_id : req.params.plan_id
			})
			.select('reviews')
			.exec(function(err, reviews) {
			
				if (!reviews) {
					sendJsonResponse(res, 404, {"message": "no lesson found"});
					return;
				} else if (err) {
					console.log(err);
					sendJsonResponse(res, 404, err);
					return;
				}
				sendJsonResponse(res, 200, reviews);
			});
		} else {
			console.log('No lessons found');
			sendJsonResponse(res, 404, {"message": "No lessons found"});
		}
	};



module.exports.reviewsCreate = function(req, res){
	getAuthor(req,res,function(req,res,userName){
	console.log("API:  reviewsCreate");
	console.log("Body: - " + req.body.review + " -- " + req.body.author);
	var requestOptions, path, planid, postdata;
	planid = req.params.plan_id;
	console.log("Plan id review added to: " + planid);
	if (planid) {
		LDB
			.findById(planid)
			//.select('reviews')
			.exec(
				function(err, lesson) {
					if (err) {
						sendJsonResponse(res, 400, err);
					} else {
						
						doAddReview(req, res, lesson, userName);
					}
				}
			);
	} else {
		sendJsonResponse(res, 404, { "message":"Not found, plan_id required"});	
	}
});
};


var getAuthor = function(req, res, callback) {
  console.log("Finding author with email " + req.payload.email);
  if (req.payload.email) {
    User
      .findOne({ email : req.payload.email })
      .exec(function(err, user) {
        if (!user) {
          sendJSONresponse(res, 404, {
            "message": "User not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(user);
        callback(req, res, user.name);
      });

  } else {
    sendJSONresponse(res, 404, {
      "message": "User not found"
    });
    return;
  }

};


var doAddReview = function(req, res, lesson, userName) {
	console.log("API: doaddreview");
	console.log("API: the data - " - req.body.rating, req.body.reviewText, req.body.author);
	console.log("Number of reviews until now: " + lesson.reviews.length);
	if (!lesson) {
		sendJsonResponse(res, 404, {
			"message": "Lesson not found"
		});
	} else {
		lesson.reviews.push({
			rating: req.body.rating,
			reviewText: req.body.reviewText,
			//author: req.body.author
			author: userName
			});

		lesson.save(function(err, lesson) {
			
			console.log(lesson);
			if (err) {
				sendJsonResponse(res, 400, err);
			} else {
				//thisReview = lesson.reviews[lesson.reviews.length  - 1];//last review
				var i = updateaveragescore(lesson._id, lesson.reviews[lesson.reviews.length-1].rating, function(err){
					if (!err){
						//console.log("i   ", i);
						console.log("No error for updateaveragescore");
						LDB
							.findById(lesson._id)
							//.select('reviews')
							.exec(
								function(err, lesson) {
									if (err) {
										sendJsonResponse(res, 400, err);
									} else {
										sendJsonResponse(res, 201, lesson);	
									}
								}
							);	
					} else {
						console.log(err);
						return;
					}
				});
			}
		});
	}
}

var updateaveragescore = function(planid, rating,callback){
	console.log("Updating the average score")
	if (planid) {
		LDB
			.findById(planid)
			//.select('reviews')
			.exec(
				function(err, lesson) {
					if (!err) {
						var j = setaveragescore(lesson, rating, function(err){

							if (!err){
								console.log("No error for setaveragescore");
								console.log("Line 236-  " + lesson.averagereview);
								console.log(lesson);
								callback();
								return lesson;
							} else {
								console.log(err);
								callback();
								return;
							}

						});
						
					}
				});
			}
};



var setaveragescore = function(lesson, rating,callback){
	console.log("Setting average score");
	var numprevreviews = lesson.reviews.length;
	//console.log("Number of reviews so far: " + prevaverage);
	var averev = lesson.averagereview;
	console.log("Current stored average review: " + numprevreviews + "  " + averev + "  " + rating);
	
	if (numprevreviews == 1){
		console.log("No reviews, so setting new average " + rating);
		var newaverage = rating;
	} else {
		//var latestreview = lesson.reviews[lesson.reviews.length - 1].rating;
		console.log("Latest review rating: " + rating);
		//console.log(prevaverage * averev + parseFloat(rating));
		var totval = ((parseFloat(numprevreviews - 1) * parseFloat(averev)) + parseFloat(rating));
		console.log("Totval: " + totval);
		var allreviews = lesson.reviews.length;

		var newaverage = totval / allreviews;
		console.log("New lesson average: " + newaverage);
	}
	console.log("Setting average review:");
	lesson.averagereview = newaverage;
	console.log(lesson.averagereview);
	lesson.save(function(err) {
		if (err){
			console.log(err);
			callback();
		} else {
			console.log("Average rating updated to " + newaverage);
			callback();
			return;
		}
	});
	
};


module.exports.reviewsDelete = function(req, res){
	var planid = req.params.plan_id;
	var reviewid = req.params.review_id;
	console.log("Reviewid for deletion: ", reviewid);
	if (planid) {
		LDB
			.findById(planid)
			//.select('reviews')
			.exec(
				function(err, lesson) {
					if (err) {
						console.log("Error: " + err);
						sendJsonResponse(res, 404, err);
						return;
					} else {
						console.log("Deleting the review --------------------------------");
						console.log(lesson.reviews);
						console.log(lesson.reviews.id(reviewid));
						var numrevs = lesson.reviews.length;
						console.log("Number of reviews----- " + numrevs);

						var delscore = lesson.reviews.id(reviewid).rating;
						lesson.reviews.id(reviewid).remove();

						var oldav = lesson.averagereview;
						console.log("Old average:---------- " + oldav);
						console.log("Score to be deleted-----" + delscore);
						var revtots = oldav * numrevs;
						var prediv = revtots - delscore;
						var newav;
						if (prediv === 0) {
							newav = 0;
						} else {
							var gh = numrevs - 1;
							newav = prediv / gh;
						}
						console.log("New average:------ " + newav);
						lesson.averagereview = newav;

						lesson.save(function(err) {
							if (err){
								sendJsonResponse(res, 404, err);
							} else {
								console.log("Removed the review from plan: " + planid);
								
								var remreviews = lesson.reviews;
								console.log("Remaining reviews: " + remreviews);
								sendJsonResponse(res, 204, remreviews);
							}
						});
					}
				}
			);
	} else {
		sendJsonResponse(res, 404, {
			"message" : "No plan_id"
		});
	}
};

module.exports.reviewsUpdateOne = function(req, res){
	
	sendJsonResponse(res, 200, {"status" : "success"});
};

