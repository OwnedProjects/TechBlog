angular.module("TechBlog")
	.controller("BlogDetsController", BlogDetsController);

BlogDetsController.$inject = ["$firebaseArray", "$rootScope", "$location", "$routeParams"];

function BlogDetsController($firebaseArray, $rootScope, $location, $routeParams){
    // variables defined
    var vm = this;
    vm.showcommentSection = false;
    vm.init = init;
    
    function init(){
        vm.rootRef = firebase.database().ref().child('/blog-post').orderByChild('bloglink').equalTo($routeParams.blogId);
        vm.blogdata = $firebaseArray(vm.rootRef);
        console.log(vm.blogdata)
    }
    
    vm.init();
}