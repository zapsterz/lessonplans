
angular
    .module('lps')
    .service('onelessonServ', onelessonServ);

var onelessonServ = function($http){
	return $http.get('/api/plans/secondary/french/580a026384496236c0005fd0');
};



