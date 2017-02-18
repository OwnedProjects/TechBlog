angular.module("TechBlog")
	.controller("AddBlogController", AddBlogController);

function AddBlogController(){
    var vm = this;
    vm.showTitleInst = false;
    vm.showFormatInst = false;
    vm.showTagInst = false;

    vm.init = function(){
        
    }

    vm.showInstruction = function(a){
        a = true;
    }

    vm.init();

}