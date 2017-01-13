fs = require('fs');
var mongoose = require('mongoose');
var LDB = mongoose.model('lessons');


var sendJsonResponse = function (res, status, content){
	res.status(status);
	res.json(content);
};

//controller for displaying ALL plans for a given level, NOT topic
module.exports.display_plans = function(req, res){
	if (req.params.topic !== undefined){
		console.log('API: Finding lesson plan details - for level AND topic', req.params);

		var query = {
			level: req.params.level,
			topic: req.params.topic
		} 
	} else {
		console.log('API: Finding lesson plan details - for level only', req.params);

		var query = {
			level: req.params.level
			}
		};
	

	if (req.params && req.params.level) {
		console.log("Params and level provided");
		LDB
			.find(query)
			.exec(function(err, lessons) {
       
			if (!lessons) {
				sendJsonResponse(res, 404, {"message": "lessons not found"});
				return;
			} else if (err) {
				console.log(err);
				sendJsonResponse(res, 404, err);
				return;
			}
       
			console.log("Number of lessons found: " + lessons.length);

			//returning the found object
			sendJsonResponse(res, 200, lessons);
		});
	} else {
    
		console.log('No lessons found');
		sendJsonResponse(res, 404, {"message": "No lessons found"});
	}
};

	
//show one specific plan, as identified by plan id
module.exports.plan_read_one = function(req, res){
	console.log('Finding lesson plan details', req.params);

	//two nested if statements
	if (req.params && req.params.plan_id) {
		LDB
			.findById(req.params.plan_id)
			.exec(function(err, lesson) {
			if (!lesson) {
				sendJsonResponse(res, 404, {"message": "plan_id not found"});
				return;
			} else if (err) {
				console.log(err);
				sendJsonResponse(res, 404, err);
				return;
			}
			console.log(lesson);
			sendJsonResponse(res, 200, lesson);
		});
	} else {
    
		console.log('No plan_id specified');
		sendJsonResponse(res, 404, {"message": "No plan_id in request"});
	}
};
	


//deleting a lesson plan
module.exports.plansDeleteOne = function(req, res){
	var planid = req.params.plan_id;
	var pathtofile = "./public/datastore/" + req.params.level + "/" + req.params.topic + "/" + planid + ".pdf";
	//console.log("file2delete - " + pathtofile);
	//fs.unlinkSync(pathtofile);
	console.log(req.params.level);	
	console.log(req.params.topic);
	console.log(req.params.plan_id);

	var dirtosearch = "./public/datastore/" + req.params.level + "/" + req.params.topic;
	console.log("Starting directory search: - " + dirtosearch);
	fs.readdir(dirtosearch, function(err, files){
			console.log("Inside dirtosearch loop");
			if (err) {
				console.log("Error found.");
    			return console.error(err);
   			}
			var match = (planid + ".").toString();

   			files.forEach(file => {
   				var fn = file.toString();   				
   				console.log(fn);
   				if (fn.startsWith(match)){
   					var filepathdelete = dirtosearch + "/" +  fn;
   					fs.unlinkSync(filepathdelete);
   				}
   			});
	})

	console.log("planid for deletion: ", planid);
	if (planid) {
		LDB
			.findByIdAndRemove(planid)
			.exec(
				function(err, plan) {
					if (err) {
						console.log("Error: " + err);
						sendJsonResponse(res, 404, err);
						return;
					} else {

						console.log("Removed the plan: " + planid);
						
						sendJsonResponse(res, 204, null);
					}
				}
			);
	} else {
		sendJsonResponse(res, 404, {
			"message" : "No plan_id"
		});
	}
};



//controller for creating/submitting a plan
module.exports.plansCreate = function(req, res){

	console.log("File - " + req.body.doc);
	var docpath = "./public/uploads/" + req.body.doc;
	var f_extarray = req.body.doc.split(".");
	var ext = f_extarray[f_extarray.length - 1];

	console.log("Docpath - " + docpath);

	var newdocpath = "./public/datastore/" + req.body.level +"/" + req.body.topic + "/" + req.body.doc;
	console.log("Newpath - " + newdocpath);

	fs.rename(docpath, newdocpath, function(err) {
		if (err) throw err;
		console.log('File moved successfully');
	});

	console.log("File - " + req.body.pdf);
	var pdfpath = "./public/uploads/" + req.body.pdf;
	//var f_extarray = req.body.doc.split(".");
	//var ext = f_extarray[f_extarray.length - 1];

	console.log("Pdfpath - " + pdfpath);

	var newpdfpath = "./public/datastore/" + req.body.level +"/" + req.body.topic + "/" + req.body.pdf;
	console.log("Newpath - " + newpdfpath);


	fs.rename(pdfpath, newpdfpath, function(err) {
		if (err) throw err;
		console.log('File moved successfully');
	});

	LDB.create({
		name : req.body.name,
		topic : req.body.topic,
		level: req.body.level,
		//link_doc: req.body.link_doc,
		link_plan: req.body.doc,
		link_plan_pdf: req.body.pdf,
		description: req.body.description,
		tags: req.body.tags,
		ext: ext
	} , function(err, lesson) {
		if (err) {
			console.log(err);
			sendJsonResponse(res, 400, err);
		} else {
			
			var filefinderarray = lesson.link_plan.split("/");
			var filefinder = filefinderarray[filefinderarray.length - 1];
			var extarray = filefinder.split(".");
			var ext = extarray[extarray.length - 1];			
			var oldfile = "./public/datastore/" + lesson.level + "/" + lesson.topic + "/" + filefinder;
			var newfile = "./public/datastore/" + lesson.level + "/" + lesson.topic + "/" + lesson._id + "." + ext;

			fs.rename(oldfile, newfile, function(err) {
				if (err) throw err;
				console.log('Doc file renamed successfully');
			});



			var filefinderarray = lesson.link_plan_pdf.split("/");
			var filefinder = filefinderarray[filefinderarray.length - 1];
			var extarray = filefinder.split(".");
			var ext = extarray[extarray.length - 1];			
			var oldfile = "./public/datastore/" + lesson.level + "/" + lesson.topic + "/" + filefinder;
			var newfile = "./public/datastore/" + lesson.level + "/" + lesson.topic + "/" + lesson._id + "." + ext;




			fs.rename(oldfile, newfile, function(err) {
				if (err) throw err;
				console.log('Pdf file renamed successfully - ' + lesson.link_plan_pdf);
			});


			sendJsonResponse(res, 201, lesson);
		}
	});
};
