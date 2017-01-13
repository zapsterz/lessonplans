 
 
function pageHeaderCtrl(authentication, $location,$cookies) {
	var vm = this;

    var today = new Date();
    var expiresValue = new Date(today);
    expiresValue.setMinutes(today.getMinutes() + 1440); 

    
    var vb = $cookies.get("vb");
    console.log(vb);
    vm.vb = vb;
    
    if (vb !== null) {
        //cookie is set
        vm.visited = "yes";
        $cookies.put('vb', "yes",  {'expires' : expiresValue}); 
    } else {
        vm.visited = "no";
        $cookies.put('vb', "yes",  {'expires' : expiresValue}); 
        vb = $cookies.get("vb");
        vm.vb = vb;
    };
    

    vm.loctest = $location.path();

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();

    vm.logout = function() {
		authentication.logout();
	    vm.isLoggedIn = authentication.isLoggedIn();

	    vm.currentUser = authentication.currentUser();

    };

    vm.isActive = function (viewLocation){
        console.log($location.path());
        return viewLocation === $location.path();
    }; 

    vm.absUrl = $location.absUrl();
	vm.locpath = $location.path();

  }



angular
    .module('lps')
    //.controller('pageHeaderCtrl', pageHeaderCtrl);
    .controller('pageHeaderCtrl', pageHeaderCtrl);