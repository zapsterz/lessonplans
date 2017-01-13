angular
	.module('lps')
	.controller('contactCtrl', contactCtrl);
	
function contactCtrl (authentication){
	
	var vm = this;
	vm.pageHeader = {
		title: 'Lesson Plans',
		inst: 'Here\'s how it works'
	};

	vm.isLoggedIn = authentication.isLoggedIn();

	vm.currentUser = authentication.currentUser();
	
	vm.sellevel = "unset";
	vm.seltopic = "unset";
	vm.searchready = vm.seltopic + "-" + vm.sellevel;
}
	