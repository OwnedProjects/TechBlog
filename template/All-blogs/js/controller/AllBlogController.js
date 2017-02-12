angular.module("GitBlog")
	.controller("AllBlogController", AllBlogController);

AllBlogController.$inject = ["$firebaseObject", "$firebaseArray","$firebaseAuth", "$rootScope", "PopUp", "$location", "UserService", "$timeout"];

function AllBlogController($firebaseObject, $firebaseArray, $firebaseAuth, $rootScope, PopUp, $location, UserService, $timeout){
	var vm = this;
	vm.rootRefBlogLinks = null;
	vm.bloglinks = null;
	vm.isLoggedIn = false;
	vm.noBlogs = false;
	vm.init = init;
	vm.loadBlogDets = loadBlogDets;
	vm.deleteBlog = deleteBlog;
	
	function init(){
		vm.rootRefBlogLinks = firebase.database().ref().child('/blog-links');
		vm.bloglinks = $firebaseArray(vm.rootRefBlogLinks);

		vm.blogPostRef = firebase.database().ref().child('/blog-post');
		vm.blogPost = $firebaseArray(vm.blogPostRef);
		
		$timeout(function(){
			if(vm.bloglinks.length<=0){
				vm.noBlogs = true;
			}
		},5000);
	};
	
	function loadBlogDets(blog){
		$location.path('/blog-details/'+blog.link);
	}

	function deleteBlog(blog){
		var delObj = null;
		for(var i=0; i<vm.blogPost.length; i++){
			if(vm.blogPost[i].bloglink == blog.link){
				delObj = vm.blogPost[i];
				console.log(delObj);
			}
		}

		vm.blogPost.$remove(delObj).then(function(refer) {
			console.log(refer)
			//PopUp.success("Blog deleted successfully.",2000)
		});

		vm.bloglinks.$remove(blog).then(function(ref) {
			PopUp.success("Blog deleted successfully.",2000)
		});
		
		$timeout(function(){
			if(vm.bloglinks.length<=0){
				vm.noBlogs = true;
			}
		},5000);
	};

	
	vm.init();
};