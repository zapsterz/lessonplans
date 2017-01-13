function loginCtrl(authentication, $window) {
    var vm = this;
	vm.formError="";
    vm.pageHeader = {
		title: 'Sign in to Lesson Plans'
    };

    vm.credentials = {
		email : "",
		password : ""
    };

    //vm.returnPage = $location.search().page || '/';
	vm.isLoggedIn = authentication.isLoggedIn();

	vm.currentUser = authentication.currentUser();

    vm.onSubmit = function () {
		console.log(vm.credentials);
		vm.formError = "";
		if (!vm.credentials.email || !vm.credentials.password) {
			vm.formError = "All fields required, please try again";
			return false;
		} else {
			vm.doLogin();
		}
    };

    vm.doLogin = function() {
		vm.formError = "";
		authentication
			.login(vm.credentials)
			.error(function(err){
				vm.formError = err;
			})
			.then(function(){
				console.log("boo");
				$window.location.href = '/#/';
				
			});
		};

};

angular
    .module('lps')
    .controller('loginCtrl', loginCtrl);
