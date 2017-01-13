  
function registerCtrl(authentication, $window) {
    var vm = this;
    vm.formError = "";

    vm.pageHeader = {
		title: 'Create a new lesson plan account'
    };

    vm.credentials = {
		name : "",
		email : "",
		password : ""
    };

   	vm.isLoggedIn = authentication.isLoggedIn();

	vm.currentUser = authentication.currentUser();


    vm.onSubmit = function () {
		vm.formError = "";
		if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
			vm.formError = "All fields required, please try again";
			return false;
		} else {
			vm.doRegister();
		}
    };

    vm.doRegister = function() {
		vm.formError = "";
		authentication
			.register(vm.credentials)
			.error(function(err){
				vm.formError = err;
			})
			.then(function(){
				$window.location.href = '/#/';
			});
		};
};


angular
    .module('lps')
    .controller('registerCtrl', registerCtrl);
