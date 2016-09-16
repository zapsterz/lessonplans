/* GET 'home' page */
module.exports.homelist = function(req, res){
	var breadcrumbs = {"firstlevel":null, "secondlevel":null};
	res.render('index', { title: 'Home' , breadcrumblist: breadcrumbs});
}

/* GET 'Location Info' page */
module.exports.locationInfo = function(req, res){
	var breadcrumbs = {"firstlevel":"Location Information", "secondlevel":null};
	res.render('index', { title: 'Location info' , breadcrumblist: breadcrumbs});
}

/* GET 'Add review' page */
module.exports.addReview = function(req, res){
	var breadcrumbs = {"firstlevel":"Review", "secondlevel":null};
	res.render('index', { title: 'Add review' , breadcrumblist: breadcrumbs});
}

/* GET 'Show Contact Info' page */
module.exports.showContacts = function(req, res){
	var breadcrumbs = {"firstlevel":"Contact Information", "secondlevel":null};
	res.render('index', { title: 'Contact Information' , breadcrumblist: breadcrumbs});
}

/* GET 'Show Primary Numeracy Lesson Plans' page */
module.exports.show_P_Numeracy = function(req, res){
	var breadcrumbs = {"firstlevel":"Primary", "secondlevel":"Numeracy"};
	res.render('P_Numeracy', { title: 'Numeracy' , breadcrumblist: breadcrumbs});
}

/* GET 'Show Primary Literacy Lesson Plans' page */
module.exports.show_P_Literacy = function(req, res){
	var breadcrumbs = {"firstlevel":"Primary", "secondlevel":"Literacy"};
	res.render('P_Literacy', { title: 'Literacy' , breadcrumblist: breadcrumbs});
}

var bc = [
    {"id":"P_Literacy", "title":"Literacy", "firstlevel":"Primary", "secondlevel":"Literacy"},
    {"id":"P_Numeracy", "title":"Numeracy", "firstlevel":"Primary", "secondlevel":"Numeracy"},
    {"id":"P_Science", "title":"Science", "firstlevel":"Primary", "secondlevel":"Science"},
    {"id":"Contact", "title":"Contact Information", "firstlevel":"Contact Information", "secondlevel":null}
];


module.exports.spa = function(req, res){
	
	var breadcrumbs = {"firstlevel":"Primary", "secondlevel":"Literacy"};	
	
	res.render('spa', { 
		info: {
		title: 'Literacy' ,
		breadcrumblist: breadcrumbs
		}
		});	
}

module.exports.show_P_Science = function(req, res){
	
	for (var i = 0; i < bc.length; i++) {
		var id = bc[i]["id"];
		if (id == "P_Science") {
			var id = bc[i].id;
			var title = bc[i].title;
			var firstlevel = bc[i].firstlevel;
			var secondlevel = bc[i].secondlevel;
			
			res.render(id, { 
				page_info: {
				website_title: 'teacherzone.co.uk',
				title: title, 
				firstlevel: firstlevel, 
				secondlevel:secondlevel, 
				breadcrumblist:{
					firstlevel:firstlevel,
					secondlevel:secondlevel
				}
				}});
		} else {
		;
		}
	}
}
