angular.module("TechBlog")
	.controller("AddBlogController", AddBlogController);

AddBlogController.$inject = ["$rootScope", "$location"];

function AddBlogController($rootScope){
    var vm = this;
    vm.showTitleInst = false;
    vm.showFormatInst = false;
    vm.showTagInst = false;
    vm.init = init;

<<<<<<< HEAD
    function init(){
        $rootScope.setActiveMenu();
=======
    vm.init = function(){
       console.log("AddBlogController") 
>>>>>>> 68997d0987989c9a6b340c107291ca3cd93f20be
    }

    vm.showInstruction = function(a){
        a = true;
    }

    vm.init();
}