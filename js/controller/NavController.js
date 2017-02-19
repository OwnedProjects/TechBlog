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
        if(!$rootScope.user){
            $location.path('/');
        }
        $rootScope.setActiveMenu();
    };

    function logout(){
        firebase.auth().signOut();
        $location.path("/");
    };

    function setActiveMenu(){
        $rootScope.menuValue = window.location.hash.split('#')[1];
    }

    vm.init();
}