angular.module("GitBlog")
	.controller("BlogDetsController", BlogDetsController);

BlogDetsController.$inject = ["$firebaseObject", "$firebaseArray", "$rootScope", "PopUp", "$location", "UserService", "$timeout", "$routeParams"];

function BlogDetsController($firebaseObject, $firebaseArray, $rootScope, PopUp, $location, UserService, $timeout, $routeParams){
	var vm = this;
	vm.rootRef = null;
	vm.blogdata = null;
	vm.blogCmtsRootRef = null;
	vm.blogCmts = null;
	vm.blogSortRootRef = null;
	vm.blogSort = null;
	vm.init = init;
	vm.goToAllBlogs = goToAllBlogs;
	vm.addComment = addComment;
	vm.deleteComment = deleteComment;

	function init(){
		console.log("BlogDetsController", $routeParams.blogId);
		vm.rootRef = firebase.database().ref().child('/blog-post').orderByChild('bloglink').equalTo($routeParams.blogId);
		vm.blogdata = $firebaseArray(vm.rootRef);

		vm.blogCmtsRootRef = firebase.database().ref().child('/blog-comments');
		vm.blogCmts = $firebaseArray(vm.blogCmtsRootRef);

		vm.blogSortRootRef = firebase.database().ref().child('/blog-comments').orderByChild('blogId').equalTo($routeParams.blogId);
		vm.blogSort = $firebaseArray(vm.blogSortRootRef);
		console.log(vm.blogSort);
	}
	
	function goToAllBlogs(){
		$location.path('/allblog');
	}
	
	function addComment(){
		var dt = new Date();
		var commentData = {
			"blogId": $routeParams.blogId,
			"comment":vm.commentBox,
			"userName":$rootScope.userData.displayName,
			"userPic": $rootScope.userData.photoURL,
			"commentDate": dt.getTime()
		};
		vm.blogCmts.$add(commentData);
		PopUp.success("Comment added successfully.",1500);
		console.log(commentData);
		vm.commentBox = null;
	}

	function deleteComment(cmtData){
		vm.blogSort.$remove(cmtData).then(function(ref) {
			PopUp.success("Comment deleted successfully.",2000)
		});
	};

	vm.init();
}