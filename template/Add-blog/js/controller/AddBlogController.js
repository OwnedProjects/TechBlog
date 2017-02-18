angular.module("TechBlog")
	.controller("AddBlogController", AddBlogController);

AddBlogController.$inject = ["$rootScope", "$location"];

function AddBlogController($rootScope, $location){
    var vm = this;
    vm.showTitleInst = false;
    vm.showFormatInst = false;
    vm.showTagInst = false;
    vm.rootRef = null;
    vm.createNewBlog = createNewBlog;

    vm.init = function(){
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
    }

    vm.showInstruction = function(a){
        a = true;
    }

    function createNewBlog(){
        console.log(vm.blogTitle, vm.content);
    }
    vm.init();

}