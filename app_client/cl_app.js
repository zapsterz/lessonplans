angular.module('lps', ['ngRoute','ngCookies']);

function config ($routeProvider, $locationProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'home/home.view.html',
			controller: 'homeCtrl',
			controllerAs: 'vm'
		})
		.when('/about', {
			templateUrl: 'about/about.view.html',
			controller: 'aboutCtrl',
			controllerAs: 'vm'
		})
		.when('/contact', {
			templateUrl: 'contact/contact.view.html',
			controller: 'contactCtrl',
			controllerAs: 'vm'			
		})
		
		.when('/submitter',{
			templateUrl: 'submit/submit.view.html',
			controller: 'submitCtrl',
			controllerAs: 'vm'
		})
		.when('/showplans/:level/:topic/:id',{
			templateUrl: 'onelesson/onelesson.view.html',
			controller: 'onelessonCtrl',
			controllerAs: 'vm'
		})
		.when('/showplans/:level',{
			templateUrl: 'lessonlist/lessonlist.view.html',
			controller: 'lessonlistCtrl',
			controllerAs: 'vm'
		})
		.when('/showplans/:level/:topic',{
			templateUrl: 'lessonlist/lessonlist.view.html',
			controller: 'lessonlistCtrl',
			controllerAs: 'vm'			
		})
		.when('/login',{
			templateUrl: 'auth/login/login.view.html',
			controller: 'loginCtrl',
			controllerAs: 'vm'			
		})
		.when('/register',{
			templateUrl: 'auth/register/register.view.html',
			controller: 'registerCtrl',
			controllerAs: 'vm'	
		})

		.otherwise({redirectTo: '/'});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

};


angular
	.module('lps')
	.config(['$routeProvider', '$locationProvider', config])
	.run(function ($templateCache, $route, $http) {
    	var url;
    	for(var i in $route.routes)
    		{
      		if (url = $route.routes[i].templateUrl)
      		{
        	$http.get(url, {cache: $templateCache});
      		}
    	}
	});