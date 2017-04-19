angular.module("TechBlog")
	.controller("LoginController", LoginController);

LoginController.$inject = ["$firebaseArray", "$location", "$rootScope", "$timeout"];

function LoginController($firebaseArray, $location, $rootScope, $timeout){
    var vm = this;
	vm.loader = false;
    vm.init = init;
    vm.googleLogin = googleLogin;
    vm.onAuthStateChanged = onAuthStateChanged;

    function init(){
		vm.loader = true;
        firebase.auth().onAuthStateChanged(vm.onAuthStateChanged);
    };

    function onAuthStateChanged(user){
		vm.loader = true;
        if(user){
            //vm.currentUID = user.uid;
            $rootScope.user = user;
			$timeout(function(){
				vm.loader = false;
                $location.path("/allblog");
            },500);
        }
		else{
			$timeout(function(){
				vm.loader = false;
            },500);
		}
    }

    function googleLogin(){
		vm.loader = true;
        var provider = new firebase.auth.GoogleAuthProvider();
    	firebase.auth().signInWithPopup(provider).then(function(){
            firebase.auth().onAuthStateChanged(vm.onAuthStateChanged);
        })
        .catch(function(err){
            alert(err.message);
        });
    }

    vm.init();
}