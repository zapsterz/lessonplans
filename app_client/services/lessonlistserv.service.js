

/*
var onelessonserv = function($http){
	return $http.get('/api/plans/secondary/french/580a026384496236c0005fd0');
};
*/


var lessonlistserv = function($http){
	var returnallplans = function(level,topic) {
		if (topic !== "0") {
			var getstring = '/api/plans/'+level+'/'+topic;
		} else {
			var getstring = '/api/plans/level/'+level;
		}
		return $http.get(getstring);
		//return $http.get('/api/plans/level/secondary');		
	};

	var delplan = function(level, topic, planid){
		var poststring = '/api/plans/delete/' + level + '/' + topic + '/' + planid;
		return $http.delete(poststring);	
	};

	return {
		returnallplans: returnallplans,
		delplan: delplan
	};
	//return $http.get('/api/plans/secondary/french/580a026384496236c0005fd0');
};





angular
    .module('lps')
    .service('lessonlistserv', lessonlistserv);

