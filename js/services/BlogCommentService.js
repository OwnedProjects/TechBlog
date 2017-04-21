angular.module("TechBlog")
	.service("BlogCommentService", BlogCommentService);

BlogCommentService.$inject = ["$firebaseArray", "$timeout", "$q"];

function BlogCommentService($firebaseArray, $timeout, $q){
    var vm = this;
	vm.blogComments = blogComments;
	
	function blogComments(){
		return $q(function(resolve, reject) {
			vm.commentRef = firebase.database().ref().child('/blog-comments').orderByChild('blogid').equalTo(vm.blogid);
			vm.comments = $firebaseArray(vm.commentRef);
		}); //$q ends
	};
};