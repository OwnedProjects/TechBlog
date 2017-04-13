angular.module("TechBlog")
	.controller("ReviewerController", ReviewerController);

ReviewerController.$inject = ["$firebaseArray","$rootScope", "$location", "$timeout"];

function ReviewerController($firebaseArray, $rootScope, $location, $timeout){
    var vm = this;
	vm.preloader = true;
	vm.noBlogsAvailable = false;
    vm.loadBlogDetail = loadBlogDetail;
    vm.init = init;
	
	function init(){
		var user = $rootScope.user;
        if(!user){
            $location.path('/');
        }
        else{			
			vm.blogsRef = firebase.database().ref().child('/blog-post').orderByChild('approvalStatus').equalTo('pending');
			vm.blogs = $firebaseArray(vm.blogsRef);

			vm.blogs.$loaded()
				.then(function(response){
					if(vm.blogs.length <= 0){
						vm.noBlogsAvailable = true;
					}
					vm.preloader = false;
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