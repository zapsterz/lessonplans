angular
	.module('lps')
	.controller('aboutCtrl', aboutCtrl);
	
function aboutCtrl (){
	
	var vm = this;
	vm.pageHeader = {
		title: 'About us',
		inst: 'Here\'s the idea.'
	};
	
}
	