angular.module("TechBlog")
 .controller("NavController", NavController);

NavController.$inject = ["$rootScope", "$location"];

function NavController($rootScope, $location){
    var vm = this;
    vm.init = init;
    $rootScope.menuValue = null; 
    vm.logout = logout;
    vm.loadProfile = loadProfile;

    function init(){
        if(!$rootScope.user){
            $location.path('allblog');
        }
    };

    function loadProfile(){
        sessionStorage.setItem("profileUser", $rootScope.user.uid);
        $location.path("/myprofile");
    };

    function logout(){
        $rootScope.user = null;
        $rootScope.menuValue = null;
        firebase.auth().signOut();
        $location.path("/");
    };

    vm.init();
}