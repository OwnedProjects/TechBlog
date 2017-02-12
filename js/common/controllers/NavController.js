angular.module("GitBlog")
	.controller("NavController", NavController);

NavController.$inject = ["$firebaseObject", "$rootScope", "PopUp", "$location", "UserService"];

function NavController($firebaseObject, $rootScope, PopUp, $location, UserService){
	var vm = this;
    vm.init = init;
    vm.signOut = signOut;
    
    function init() {
        if(firebase.auth().currentUser === null){
            $location.path("/");
        }
    };
    
    function signOut() {
        firebase.auth().signOut();
        $location.path("/");
    }
    vm.init();
};