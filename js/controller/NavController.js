angular.module("TechBlog")
	.controller("NavController", NavController);

NavController.$inject = ["$rootScope", "$location"];

function NavController($rootScope, $location){
    var vm = this;
    vm.init = init;
    $rootScope.menuValue = null; 
    vm.logout = logout;
    $rootScope.setActiveMenu = setActiveMenu;

    function init(){
        console.log("NavController");
        $rootScope.setActiveMenu();
    };

    function logout(){
        firebase.auth().signOut();
        $location.path("/");
    };

    function setActiveMenu(){
        //alert('setActiveMenu');
        $rootScope.menuValue = window.location.hash.split('#')[1];
        //console.log(vm.menuValue);
    }

    vm.init();
}