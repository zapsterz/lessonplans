var fs = require('fs');
var request = require('request');
var apiOptions = {
	server : "http://127.0.0.1:3000"
};
if (process.env.NODE_ENV === 'production') {
	apiOptions.server = "https://salty-journey-31356.herokuapp.com";
}

menuoptions = {
	primary:{title:"Primary",links:["art", "literacy", "numeracy", "science"], options:["Art", "Literacy", "Numeracy", "Science"]},
	secondary:{title:"Secondary",links:["art","biology","chemistry","english","mathematics","physics"], options:["Art","Biology","Chemistry","English","Mathematics","Physics"]}
	};

/* GET 'home' page */
module.exports.homelist = function(req, res){
	renderHomepage(req, res);
};

var renderHomepage = function(req, res) {
	res.render('index', {
		title: 'Home',
		menuoptions: menuoptions
	});
};

/* GET page to show a list of page for just LEVEL */
module.exports.showplanslevel = function(req, res){
	var requestOptions, path;

	if (req.params.topic !== undefined){
		console.log("Seeking for level AND topic");
		path = "/api/plans/" + req.params.level + "/" + req.params.topic;
	} else {
		console.log("Seeking for level only");
		path = "/api/plans/level/" + req.params.level;
	}
	
	console.log("Path - " + path);
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {},
	};
	console.log(requestOptions);
	request (
		requestOptions,
		function(err, response, body){
			var data = body;
			//console.log(body);
			if (response.statusCode === 200){
				renderAllPlans(req, res, body);
			} else {
				_showError(req, res, response.statusCode); //catches the error if lesson code not found in database				
			}		
		}
	);
};


String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var renderAllPlans = function(req, res, responseBody) {

	console.log(responseBody.length + " lessons found");	
	var linkids = [];
	
	if (req.params.topic !== undefined) {
		topicu = req.params.topic.capitalizeFirstLetter();
	} else {
		topicu = req.params.topic;
	}
	
	res.render('allplans', {
		title : 'List of plans',
		found : responseBody.length,
		plans : responseBody,
		level : req.params.level,
		levelu : req.params.level.capitalizeFirstLetter(),
		topic : req.params.topic,
		topicu : topicu,
		linkid : linkids,
		menuoptions : menuoptions
	});
};

/* GET page to show a single plan */
module.exports.showaplan = function(req, res){

	var requestOptions, path;
	console.log(req.params.level + " - " + req.params.topic + " - " + req.params.id);
	path = "/api/plans/" + req.params.level + "/" + req.params.topic + "/" + req.params.id;	
	console.log("Path: " + path);
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {},
	};
	request (
		requestOptions,
		function(err, response, body){
			var data = body;
			if (response.statusCode === 200){
				renderAPlan(req, res, body);
			} else {
				_showError(req, res, response.statusCode); //catches the error if lesson code not found in database				
			}
		}
	);
};

var renderAPlan = function(req, res, responseBody) {
	console.log("Average review: " + responseBody.averagereview);
	console.log("Plan link: " + responseBody.link_doc);
	console.log("Req.params :" + req.params);
	
	res.render('plan', {
		title : 'A single plan',
		id : req.params.id,
		plan : responseBody,
		level : req.params.level,
		topic : req.params.topic,
		levelu : req.params.level.capitalizeFirstLetter(),
		topicu : req.params.topic.capitalizeFirstLetter(),
		menuoptions : menuoptions
	});
};

var _showError = function(req,res,status) {
	var title, content;
	if (status === 404) {
		title = "404, not found";
		content = "Oh dear, we can't find this page, sorry"
	} else {
		title = status + ", somethig's gone wrong";
		content= "something, somewhere, has gone wrong";
	}
	res.status(status);
	res.render('errors', {
		title: title,
		content: content,
		menuoptions : menuoptions
	});
	
};


/*render the form to fill in to create a plan */
module.exports.submit_form = function(req, res){
	console.log("show submit form.........");
	res.render('createPlan', { 
		title: 'Submit a new plan',
		menuoptions : menuoptions
	});
};


module.exports.sn = function(req,res){
	console.log("made it");
	console.log("Submitting a new plan: ------------------------");

	console.log(req.body.name, req.body.topic, req.body.level);
	path = "/api/plans/submit";
	var tagvals;
	//var filepath = req.file.filename;
	
	var doc = req.files['doc'][0].filename;
	console.log(doc);
	
	var pdf = req.files['pdf'][0].filename;
	console.log(pdf);
	
	//If no tags provided, set the topic as a tag as a minimum
	if (req.body.tags == '') {
		tagvals = req.body.topic;
	} else {
		tagvals = req.body.tags;
	}

	postdata = {
		name: req.body.name,
		topic: req.body.topic,
		level: req.body.level,
		tags: tagvals,
		description: req.body.description,
		doc : doc,
		pdf : pdf
	};
	console.log("Postdata for lesson submission:   " + postdata);
	requestOptions = {
		url : apiOptions.server + path,
		method : "POST",
		json : postdata
	};	
	console.log("Path for submission: " + apiOptions.server + path);

	if (!postdata.name || !postdata.topic || !postdata.level) {
		res.redirect('/submit/');
		console.log("Failed lesson submit - something was missing");
	} else {
		request(
			requestOptions,
			function(err, response, body) {
				if (response.statusCode === 201) {
					console.log("Submitted plan - details below");
					console.log(body);
					res.redirect('/showplans/'+body.level+'/' + body.topic + '/' + body._id);
				} else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
					console.log("nope");
					res.redirect('/submit');
				} else {
					console.log(body);
					console.log("")
					_showError(req, res, response.statusCode);
				}
			});
		}
}


/*post the data to the api, then return the rendered plan (single plan view)*/

module.exports.dosubmit_form = function(req, res){
	console.log("Submitting a new plan: ------------------------");
	path = "/api/plans/submit";
	var tagvals;
	
	var doc = req.files['doc'][0].filename;
	console.log(doc);
	
	var pdf = req.files['pdf'][0].filename;
	console.log(pdf);
	
	//If no tags provided, set the topic as a tag as a minimum
	if (req.body.tags == '') {
		tagvals = req.body.topic;
	} else {
		tagvals = req.body.tags;
	}

	postdata = {
		name: req.body.name,
		topic: req.body.topic,
		level: req.body.level,
		tags: tagvals,
		description: req.body.description,
		doc : doc,
		pdf : pdf
	};
	console.log("Postdata for lesson submission:   " + postdata);
	requestOptions = {
		url : apiOptions.server + path,
		method : "POST",
		json : postdata
	};	
	console.log("Path for submission: " + apiOptions.server + path);
	if (!postdata.name || !postdata.topic || !postdata.level) {
		res.redirect('/submit');
		console.log("Failed lesson submit - something was missing");
	} else {
		request(
			requestOptions,
			function(err, response, body) {
				if (response.statusCode === 201) {
					console.log("Submitted plan - details below");
					console.log(body);
					res.redirect('/showplans/'+body.level+'/' + body.topic + '/' + body._id);
				} else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
					console.log("nope");
					res.redirect('/submit/');
				} else {
					console.log(body);
					console.log("")
					_showError(req, res, response.statusCode);
				}
			});
		}

	}


/* Doing 'Add review' */
module.exports.doaddreview = function(req, res){
	var level = req.params.level;
	var topic = req.params.topic;
	var planid = req.params.id;
	var path = "/api/plans/" + level + "/" + topic + "/" + planid + "/reviews";
	console.log("Adding a review--------------------");
	console.log("Path:  " + path);
	postdata = {
		rating: req.body.rating,
		reviewText: req.body.review,
		author: req.body.author
	};
	requestOptions = {
		url : apiOptions.server + path,
		method : "POST",
		json : postdata
	};
	console.log("URL for adding review: " + requestOptions.url);
	console.log("Review data: " + postdata.rating + postdata.reviewText + postdata.author);
	
	request(
		requestOptions,
		function(err, response, body) {
			if (response.statusCode === 201){
				renderAPlan(req, res, body);
			} else {
				_showError(req, res, response.statusCode);
			}
		}
		
	);

};

/* Delete a plan page */
module.exports.deleteaplan = function(req, res){
	var level = req.params.level;
	var topic = req.body.topic;
	var planid = req.body.plan_id;
	var path = "/api/plans/delete/" + level + "/" + topic + "/" + planid;
	console.log("Deleting a plan--------------------");
	console.log("Path:  " + path);
	/*postdata = {
		rating: req.body.rating,
		reviewText: req.body.review,
		author: req.body.author
	};*/
	requestOptions = {
		url : apiOptions.server + path,
		method : "DELETE",
		json : {}
	};
	console.log("URL for deleting plan: " + requestOptions.url);
	
	request(
		requestOptions,
		function(err, response, body) {
			if (response.statusCode === 204){
				res.redirect('/#/showplans/' + level + '/' + topic);
			} else {
				_showError(req, res, response.statusCode);
			}
		}
	);
};


/* Delete a review page */
module.exports.deleteareview = function(req, res){
	var level = req.params.level;
	var topic = req.params.topic;
	var planid = req.params.id;
	var reviewid = req.body.review_id;
	var path = "/api/reviews/delete/" + planid + "/" + reviewid;
	console.log("Deleting a review--------------------");
	console.log("Path:  " + path);
	requestOptions = {
		url : apiOptions.server + path,
		method : "DELETE",
		json : {}
	};
	console.log("URL for deleting review: " + requestOptions.url);

	request(
		requestOptions,
		function(err, response, body) {
			if (response.statusCode === 204){
				res.redirect('/#/showplans/' + level + '/' + topic + '/' + planid);
			} else {
				_showError(req, res, response.statusCode);
			}
		}		
	);
};


/* GET 'Show Contact Info' page */
module.exports.showContacts = function(req, res){
	var breadcrumbs = {"firstlevel":"Contact Information", "secondlevel":null};
	res.render('index', { title: 'Contact Information' , breadcrumblist: breadcrumbs});
}

