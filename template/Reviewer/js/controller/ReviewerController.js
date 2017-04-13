angular.module("TechBlog")
	.controller("ReviewerController", ReviewerController);

ReviewerController.$inject = ["$firebaseArray","$rootScope", "$location", "$timeout"];

function ReviewerController($firebaseArray, $rootScope, $location, $timeout){
    var vm = this;
	vm.preloader = true;
	vm.reviewBlogs = null;
	vm.noBlogsAvailable = false;
    vm.loadBlogDetail = loadBlogDetail;
    vm.init = init;
	
	function init(){
		vm.reviewBlogs = new Array();
		var user = $rootScope.user;
        if(!user){
            $location.path('/');
        }
        else{			
			vm.blogsRef = firebase.database().ref().child('/blog-post').orderByChild('approvalStatus').equalTo('pending');
			vm.blogs = $firebaseArray(vm.blogsRef);
			vm.blogs.$loaded()
				.then(function(response){
					vm.preloader = false;
					
					vm.currentUser = firebase.auth().currentUser;
					for(var i=0; i<vm.blogs.length; i++){
						if(vm.blogs[i].reviewerId == vm.currentUser.uid){
							vm.reviewBlogs.push(vm.blogs[i]);
						}
					}
					
					
					if(vm.reviewBlogs.length <= 0){
						vm.noBlogsAvailable = true;
					}
				})
				.catch(function(err){
					console.log(err)
				});
		}
	};
	
	function loadBlogDetail(blogDet){
		$location.path("/blogdetails/"+blogDet.bloglink);
	}
	
	vm.init();
}