angular.module("TechBlog")
	.service("BlogCommentService", BlogCommentService);

BlogCommentService.$inject = ["$firebaseArray", "$timeout", "$q"];

function BlogCommentService($firebaseArray, $timeout, $q){
    var vm = this;
	vm.postComment = postComment;
	
	function postComment(commentData, blogid){
		return $q(function(resolve, reject) {
			vm.commentRef = firebase.database().ref().child('/blog-comments').orderByChild('blogid').equalTo(blogid);
			vm.comments = $firebaseArray(vm.commentRef);
			vm.comments.$add(commentData)
				.then(function(response){
					resolve(response)
				})
				.catch(function(err){
					reject(err)
				});
		}); //$q ends
	};
};