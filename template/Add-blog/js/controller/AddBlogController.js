angular.module("TechBlog")
	.controller("AddBlogController", AddBlogController);

AddBlogController.$inject = ["$rootScope", "$location"];

function AddBlogController($rootScope){
    var vm = this;
    vm.showTitleInst = false;
    vm.showFormatInst = false;
    vm.showTagInst = false;
    vm.init = init;

    function init(){
        $rootScope.setActiveMenu();
    }

    vm.showInstruction = function(a){
        a = true;
    }

    vm.init();
}