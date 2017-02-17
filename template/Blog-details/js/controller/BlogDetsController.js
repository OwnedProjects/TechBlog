angular.module("TechBlog")
	.controller("BlogDetsController", LoginController);

function BlogDetsController(){
    var vm = this;
    vm.showcommentSection = false;

    vm.init = function(){
        alert('loading');
    }

    vm.togglecommentSection = function(){
        alert('sdfsd');
        vm.showcommentSection = vm.showcommentSection === false ? true: false;
    }
    
    vm.init();
}