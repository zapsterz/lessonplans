

var testlist = function($scope) {
	$scope.items = ["one","two","three"];
};


var lessonDataTest = function($http){
	//var lessonSearchOpts = function (level, topic){
		//return $http.get('/api/plans/level/'+level + '/' + topic);
//	var lessonSearchOpts = function () {
		return $http.get('/api/plans/level/primary');

//	return {lessonSearchOpts : lessonSearchOpts}
};


var lessonDataCtrl = function($scope, lessonDataTest) {
	lessonDataTest
		.success(function(data){
			$scope.data = { lessons : data };		
		})
		.error(function (e){
			console.log(e);
		});
};


var formatavereview = function(){
	return function(averev){
		if (averev == 0) {
			return "?";
		} else {
			var formatrev = parseFloat(averev).toFixed(1);
			return formatrev;
		}
	};
};



angular
	.module('lps',[])
	.controller('lessonDataCtrl', lessonDataCtrl)
	.filter('formatavereview', formatavereview)
	.service('lessonDataTest', lessonDataTest);


