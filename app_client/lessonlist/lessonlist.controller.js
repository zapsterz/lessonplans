

function lessonlistCtrl ($routeParams, lessonlistserv){
//function onelessonCtrl ($routeParams, onelessonServ){
	
	var vm = this;
	
	if ($routeParams.topic !== undefined){
		var topicsearcher = $routeParams.topic;
	} else {
		var topicsearcher = "0";
	}
	
	vm.onSubmit = function(level,topic,id) {

		lessonlistserv.delplan(level, topic, id)
			.success(function(data){
				console.log("Plan successfully deleted");
				
				lessonlistserv.returnallplans($routeParams.level, topicsearcher)
					.success(function(data){
						vm.alllessons = data;				
					})
					.error(function (e){
						console.log(e);
					});
			});
	
	};



	lessonlistserv.returnallplans($routeParams.level, topicsearcher)
		.success(function(data){
			vm.alllessons = data;
			//vm.avround = Math.round(vm.lesson.averagereview);				
		})
		.error(function (e){
			console.log(e);
		});
	
	vm.deleteplanurl = "/delete/" + $routeParams.level + "/" + $routeParams.topic;
	vm.topic = $routeParams.topic;
	vm.level = $routeParams.level;
	vm.testnum = 6.5768678;
	
	if (vm.level === 'primary'){
		vm.alltopics = ['Art','Literacy','Music','Numeracy','Science'];
	} else {
		vm.alltopics = ['Art','Biology','Chemistry','English','French','Mathematics','Physics'];
	};


	//vm.alltopics = ['Art','Literacy','Music','Numeracy','Science'];
	//vm.actionurl = "/showplans/" + $routeParams.level + "/" + $routeParams.topic + "/" + $routeParams.id;
	//vm.deletereviewurl = "/delete/"+$routeParams.level+"/"+ $routeParams.topic +"/" + $routeParams.id+"/reviews";
	//vm.planurl = "/datastore/"+$routeParams.level+"/"+ $routeParams.topic +"/" + $routeParams.id+".pdf";
	//vm.avround = vm.lesson.averagereview;
};	

angular
	.module('lps')
	.controller('lessonlistCtrl', lessonlistCtrl);
