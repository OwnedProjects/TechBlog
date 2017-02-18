angular.module("TechBlog")
	.controller("AllBlogController", AllBlogController);

AllBlogController.$inject = ["$rootScope", "$location"];

function AllBlogController($rootScope, $location){
    var vm = this;
    vm.init = init;

    function init(){
        $rootScope.setActiveMenu();
    };

    vm.init();
}