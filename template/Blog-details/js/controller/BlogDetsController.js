angular.module("TechBlog")
	.controller("BlogDetsController", BlogDetsController);

function BlogDetsController(){
    var vm = this;
    vm.showcommentSection = false;
    vm.togglecommentSection = togglecommentSection;
    vm.init = init;
    
    function init(){
    }

    function togglecommentSection (){
        alert('sdfsd');
        vm.showcommentSection = vm.showcommentSection === false ? true: false;
    }
    
    vm.init();
}