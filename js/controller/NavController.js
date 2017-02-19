angular.module("TechBlog")
 .controller("NavController", NavController);

NavController.$inject = ["$rootScope", "$location"];

function NavController($rootScope, $location){
    var vm = this;
    vm.init = init;
    $rootScope.menuValue = null; 
    vm.logout = logout;

    function init(){
        if(!$rootScope.user){
            $location.path('/');
        }
    };

    function logout(){
        firebase.auth().signOut();
        $location.path("/");
    };

    vm.init();
}