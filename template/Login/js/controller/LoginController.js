angular.module("TechBlog")
	.controller("LoginController", LoginController);

LoginController.$inject = ["$firebaseArray", "$location", "$rootScope", "$timeout"];

function LoginController($firebaseArray, $location, $rootScope, $timeout){
    var vm = this;
    vm.init = init;
    vm.googleLogin = googleLogin;
    vm.onAuthStateChanged = onAuthStateChanged;

    function init(){
        firebase.auth().onAuthStateChanged(vm.onAuthStateChanged);
    };

    function onAuthStateChanged(user){
        if(user){
            //vm.currentUID = user.uid;
            $rootScope.user = user;
             $timeout(function(){
                $location.path("/allblog");
            },500);
        }
    }

    function googleLogin(){
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