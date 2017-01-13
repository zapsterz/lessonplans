


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
	.module('lps')
	.filter('formatavereview', formatavereview);

