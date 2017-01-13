

var choosestars = function(){
	return function(averev){
		if (averev < 0.5 && averev > 0.001) {
			return "/images/0stars.png";
		} else if (averev >= 0.5 && averev < 1.5) {
			return "/images/1stars.png";
		} else if (averev >= 1.5 && averev < 2.5) {
			return "/images/2stars.png";
		} else if (averev >= 2.5 && averev < 3.5) {
			return "/images/3stars.png";
		} else if (averev >= 3.5 && averev < 4.5) {
			return "/images/4stars.png";
		} else if (averev >= 4.5 && averev < 5.5) {
			return "/images/5stars.png";
		} else if (averev >= 5.5 && averev < 6.5) {
			return "/images/6stars.png";
		} else if (averev >= 6.5 && averev < 7.5) {
			return "/images/7stars.png";
		} else if (averev >= 7.5 && averev < 8.5) {
			return "/images/8stars.png";
		} else if (averev >= 8.5 && averev < 9.5) {
			return "/images/9stars.png";
		} else if (averev >=9.5) {
			return "/images/10stars.png";
		} else {
			return "No rating available";
		}
	};
};



angular
	.module('lps')
	.filter('choosestars', choosestars);

