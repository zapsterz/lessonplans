
function navigation () {
    	return {
    		//restrict: 'EA',
    		templateUrl: '/directives/navigation/navigation.template.html'
    	};
    }

 angular
 	.module('lps')
 	.directive('navigation', navigation);
