angular.module("TechBlog")
	.controller("AddBlogController", AddBlogController);

AddBlogController.$inject = ["$rootScope", "$location"];

function AddBlogController($rootScope){
    var vm = this;
    vm.showTitleInst = false;
    vm.showFormatInst = false;
    vm.showTagInst = false;
    vm.init = init;
    vm.createNewBlog = createNewBlog;

    function init(){
        $rootScope.setActiveMenu();
    }
    vm.init = function(){
       console.log("AddBlogController") ;
    }

    vm.showInstruction = function(a){
        a = true;
    }

    function createNewBlog(){
        console.log(vm.blogTitle, vm.content)
    }
    vm.init();
}