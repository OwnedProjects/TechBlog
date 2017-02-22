angular.module("TechBlog")
	.controller("BlogDetsController", BlogDetsController);

BlogDetsController.$inject = ["$rootScope", "$location"];

function BlogDetsController($rootScope){
    // variables defined
    var vm = this;
    vm.showcommentSection = false;

    // function defining
    vm.init = init;
    
    function init(){

    }
    
    vm.init();
}