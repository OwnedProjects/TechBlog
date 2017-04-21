angular.module("TechBlog")
	.service("BlogPostService", BlogPostService);

BlogPostService.$inject = ["$firebaseArray", "$timeout", "$q"];

function BlogPostService($firebaseArray, $timeout, $q){
    var vm = this;
	vm.getBlogDataBlogPost = getBlogDataBlogPost;	
	
	function getBlogDataBlogPost(blogId){
		return $q(function(resolve, reject) {
			var rootRef = firebase.database().ref().child('/blog-post').orderByChild('bloglink').equalTo(blogId);
			var blogdata = $firebaseArray(rootRef);
			blogdata.$loaded()
				.then(function(snapshot){
					resolve(snapshot);
				})
				.catch(function(err){
					reject(err)
				});
		}); //$q ends
	};	
};