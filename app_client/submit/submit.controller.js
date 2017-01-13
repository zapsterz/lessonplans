angular
	.module('lps')
	.controller('submitCtrl', submitCtrl);
	
var menuoptions = {
	primary:{title:"Primary",links:["art", "literacy", "numeracy", "science"], options:["Art", "Literacy", "Numeracy", "Science"]},
	secondary:{title:"Secondary",links:["art","biology","chemistry","english","mathematics","physics"], options:["Art","Biology","Chemistry","English","Mathematics","Physics"]}
	};
	
var titles = {
	opt1:{titleU:"Primary", titlel:"primary"},
	opt2:{titleU:"Secondary", titlel:"secondary"}
};

var primarystuff = {
	opt1:{titleU:"Art", titlel:"art"},
	opt2:{titleU:"Literacy", titlel:"literacy"},
	opt3:{titleU:"Music", titlel:"music"},
	opt4:{titleU:"Numeracy", titlel:"numeracy"},
	opt5:{titleU:"Science", titlel:"science"}
};

var secondarystuff = {
	opt1:{titleU:"Art", titlel:"art"},
	opt7:{titleU:"Biology", titlel:"biology"},
	opt8:{titleU:"Chemistry", titlel:"chemistry"},
	opt2:{titleU:"English", titlel:"english"},
	opt9:{titleU:"French", titlel:"french"},
	opt3:{titleU:"Mathematics", titlel:"mathematics"},
	opt4:{titleU:"Physics", titlel:"physics"}
};

function submitCtrl (){
	
	var vm = this;
	vm.pageHeader = {
		title: 'Submit a new lesson plan',
		inst: 'Fill out the form below',
		test: menuoptions
	};
	vm.titles = titles;
	vm.primarytopics = primarystuff;
	vm.secondarytopics = secondarystuff;
	}	
	
