angular.module("TechBlog")
	.controller("BlogDetsController", BlogDetsController);

function BlogDetsController(){
    // variables defined
    var vm = this;
    vm.showcommentSection = false;

    // function defining
    vm.init = init;
    vm.togglecommentSection = togglecommentSection;
    
    function init(){
    }

    function togglecommentSection (){
        vm.showcommentSection = vm.showcommentSection === false ? true: false;
    }
    
    vm.init();
}