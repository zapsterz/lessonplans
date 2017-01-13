


var testlist = function($scope) {
	$scope.items = ["one","two","three"];
};


var lessonDataTest = function(){
	return [{
			lesson_num: "1",
			topic: "numeracy",
			level: "primary"
		},{
			lesson_num: "2",
			topic: "numeracy",
			level: "tertiary"
		}];
	};


var lessonDataCtrl = function($scope, lessonDataTest) {
	console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	$scope.data = { lessons : lessonDataTest };
}

/*
var lessonCtrl = function ($scope, lessonData) {
	$scope.data = { lessons: lessonData};
}

var lessonData = function($http) {
	console.log("**********************************************************");
	return $http.get('/api/plans/level/primary'); 
};
*/
//var lessonDatatest = function(){
//	return [{
//		topic: "numeracy",
//		level: "primary"
//	}];
//};

angular
	.module('lps',[])
	.controller('testlist', testlist)
//	.controller('lessonCtrl', lessonCtrl)
	.controller('lessonDataCtrl', lessonDataCtrl)
//	.controller('lessonDataCtrl', lessonDataCtrl)
//	.service('lessonData', lessonData)
	.service('lessonDataTest', lessonDataTest);


