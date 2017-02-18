angular.module("TechBlog")
	.controller("AddBlogController", AddBlogController);

AddBlogController.$inject = ["$rootScope", "$location"];

<<<<<<< HEAD
function AddBlogController($rootScope, $location){
=======
function AddBlogController($rootScope){
>>>>>>> 01aca62ed69b5635587e47061cddfa52e95121a9
    var vm = this;
    vm.showTitleInst = false;
    vm.showFormatInst = false;
    vm.showTagInst = false;
<<<<<<< HEAD
    vm.rootRef = null;
    vm.createNewBlog = createNewBlog;
=======
    vm.init = init;
>>>>>>> 01aca62ed69b5635587e47061cddfa52e95121a9

    function init(){
        $rootScope.setActiveMenu();
    }
    vm.init = function(){
<<<<<<< HEAD
       console.log("AddBlogController", $rootScope.user) 
       if(!$rootScope.user){
           $location.path('/');
       }
       else{
            vm.rootRef = firebase.database().ref().child('/blog-post');
			vm.blogs = $firebaseArray(vm.rootRef);
			vm.rootRefBlogLinks = firebase.database().ref().child('/blog-links');
            vm.bloglinks = $firebaseArray(vm.rootRefBlogLinks); 
       }
=======
       console.log("AddBlogController") ;
>>>>>>> 01aca62ed69b5635587e47061cddfa52e95121a9
    }

    vm.showInstruction = function(a){
        a = true;
    }

    function createNewBlog(){
        console.log(vm.blogTitle, vm.content);
    }
    vm.init();
}