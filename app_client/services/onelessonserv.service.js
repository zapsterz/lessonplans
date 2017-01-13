

/*
var onelessonserv = function($http){
	return $http.get('/api/plans/secondary/french/580a026384496236c0005fd0');
};
*/


var onelessonserv = function($http, authentication){
	var returnplan = function(level,topic,id) {
		var getstring = '/api/plans/'+level+'/'+topic+'/'+id;
		return $http.get(getstring);		
	};
	var addreview = function(level,topic,id, formdata){
		var poststring = '/api/plans/' + level + '/' + topic + '/' + id + '/reviews';
		return $http.post(poststring, formdata, {headers: {
			Authorization: 'Bearer ' + authentication.getToken()
		}
	});	
	};

	var delreview = function(planid,revid){
		var poststring = '/api/reviews/delete/' + planid + '/' + revid;
		return $http.delete(poststring);	
	};

	return {
		returnplan: returnplan,
		addreview: addreview,
		delreview: delreview
	};
	//return $http.get('/api/plans/secondary/french/580a026384496236c0005fd0');
};





angular
    .module('lps')
    .service('onelessonserv', onelessonserv);

