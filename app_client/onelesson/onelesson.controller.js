

function onelessonCtrl ($routeParams, onelessonserv){
//function onelessonCtrl ($routeParams, onelessonServ){
	
	var vm = this;
	vm.formData = {};
	vm.planid = $routeParams.id;
	vm.topic = $routeParams.topic;
	vm.level = $routeParams.level;
	vm.tempimage = "/images/0stars.png";

	vm.delrev = function(planid,revid){
		console.log(planid,revid);
		onelessonserv.delreview(planid,revid)
			.success(function(data){
				console.log(data);
				console.log("Success - review deleted");
				vm.lesson.reviews = data;
				console.log(vm.lesson.reviews);



				onelessonserv.returnplan($routeParams.level,$routeParams.topic,$routeParams.id )
					.success(function(data){
						vm.lesson = data;
						vm.avround = Math.round(vm.lesson.averagereview);				
					})
					.error(function (e){
						console.log(e);
					});
	
			});
		console.log("cl working");
	};

	vm.onSubmit = function() {
		console.log(vm.formData);
		vm.doaddreview(vm.level, vm.topic, vm.planid, vm.formData);
	};

	vm.doaddreview = function(level, topic, planid, formData){
		var numrating = vm.formData.rating;
		onelessonserv.addreview(level, topic, planid, {
			author : vm.formData.authorname,
			rating : numrating,
			reviewText : vm.formData.review
		})
		.success(function(data){
			vm.lesson = data;
			vm.formData = {};
			vm.tempimage = "/images/0stars.png";
		});
	};

	onelessonserv.returnplan($routeParams.level,$routeParams.topic,$routeParams.id )
		.success(function(data){
			vm.lesson = data;
			vm.avround = Math.round(vm.lesson.averagereview);				
		})
		.error(function (e){
			console.log(e);
		});
	

	vm.actionurl = "/showplans/" + $routeParams.level + "/" + $routeParams.topic + "/" + $routeParams.id;
	vm.deletereviewurl = "/delete/" + $routeParams.level + "/" + $routeParams.topic + "/" + $routeParams.id + "/reviews";
	vm.planurl = "/datastore/" + $routeParams.level + "/" + $routeParams.topic + "/" + $routeParams.id + ".pdf";
	console.log(vm.planurl);

};	

angular
	.module('lps')
	.controller('onelessonCtrl', onelessonCtrl);
