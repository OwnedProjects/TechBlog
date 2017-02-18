angular.module("TechBlog")
	.controller("BlogDetsController", BlogDetsController);

BlogDetsController.$inject = ["$rootScope", "$location"];

function BlogDetsController($rootScope){
    // variables defined
    var vm = this;
    vm.showcommentSection = false;

    // function defining
    vm.init = init;
    vm.togglecommentSection = togglecommentSection;
    
    function init(){
        $rootScope.setActiveMenu();
    }

    function togglecommentSection (){
        vm.showcommentSection = vm.showcommentSection === false ? true: false;
    }
    
    vm.init();
}