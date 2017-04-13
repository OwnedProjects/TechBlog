angular.module("TechBlog")
	.controller("BlogDetsController", BlogDetsController);

BlogDetsController.$inject = ["$firebaseArray", "$rootScope", "$location", "$routeParams", "$timeout"];

function BlogDetsController($firebaseArray, $rootScope, $location, $routeParams, $timeout){
    // variables defined
    var vm = this;
    vm.blogdets = null;
    vm.blogid = null;
    vm.currentUser = null;
    vm.userDets = null;
    vm.user = null;
    vm.showcommentSection = false;
	vm.showReviewerBtns = false;
	vm.hideRejectedBtn = false;
    vm.commentRef = null;
    vm.comments = null;
    vm.init = init;
    vm.postComment = postComment;
    vm.writeAComment = writeAComment;
    vm.loadProfile = loadProfile;
    vm.approveBlog = approveBlog;
    vm.rejectBlog = rejectBlog;

    function init(){
        vm.user = $rootScope.user;
		vm.currentUser = firebase.auth().currentUser;
        vm.userRef = firebase.database().ref().child('/users').orderByChild('uid').equalTo(vm.currentUser.uid);
		vm.userData = $firebaseArray(vm.userRef);
		vm.userData.$loaded()
            .then(function(snapshot){
                vm.userDets = snapshot[0];
			})
			.catch(function(err){
				console.log(err)
			});
		
        vm.rootRef = firebase.database().ref().child('/blog-post').orderByChild('bloglink').equalTo($routeParams.blogId);
        vm.blogdata = $firebaseArray(vm.rootRef);
        vm.blogdata.$loaded()
            .then(function(snapshot){
                vm.blogdets = snapshot[0];
                vm.blogid = snapshot[0].blogid;

				if(vm.userDets.rank == 'reviewer' && vm.currentUser.uid != vm.blogdets.userId && vm.blogdets.approvalStatus!='approved')
				{
					vm.showReviewerBtns = true;
					if(vm.blogdets.approvalStatus == 'rejected'){
						vm.hideRejectedBtn = true;
					}
				}else{
					vm.showReviewerBtns = false;
				}
			
                vm.commentRef = firebase.database().ref().child('/blog-comments').orderByChild('blogid').equalTo(vm.blogid);
                vm.comments = $firebaseArray(vm.commentRef);
                //console.log(vm.comments);
            })
            .catch(function(err){
                console.log("Error: ", err)
            });
    };

    function loadProfile(profUid){
        sessionStorage.setItem("profileUser", profUid);
        $location.path("/myprofile");
    };

    function postComment(){
        var dt = new Date();
        var commentData = {
            "blogid": vm.blogid,
            "comment": vm.commentdet,
			"userId": $rootScope.user.uid,
            "username": $rootScope.user.displayName,
            "userPic": $rootScope.user.photoURL,
            "cmntdate": dt.getTime()
		};

        vm.comments.$add(commentData);
        vm.commentdet = null;
        vm.showcommentSection = false;
    };

    function writeAComment(){
        console.log($rootScope.user);
        if(vm.user){
            vm.showcommentSection = true;
            $timeout(function(){
                window.scroll(0,(window.innerHeight*2));
            },200);
        }
        else{
            $location.path("/");
        }
    }
    
	function approveBlog(){
		vm.rootRef = firebase.database().ref().child('/blog-post').orderByChild('bloglink').equalTo($routeParams.blogId);
        vm.blogdata = $firebaseArray(vm.rootRef);
		vm.blogdata.$loaded()
            .then(function(snapshot){
				var list = snapshot;
				list[0].approvalStatus = "approved";
				list.$save(0).then(function(ref) {
					vm.showReviewerBtns = false;
					alert("Blog approved");
				})
				.catch(function(err){
					console.log("blog update error: ", err);
				});
			})
			.catch(function(err){
				console.log(err)
			});
	};
	
	function rejectBlog(){
		vm.rootRef = firebase.database().ref().child('/blog-post').orderByChild('bloglink').equalTo($routeParams.blogId);
        vm.blogdata = $firebaseArray(vm.rootRef);
		vm.blogdata.$loaded()
            .then(function(snapshot){
				var list = snapshot;
				list[0].approvalStatus = "rejected";
				list.$save(0).then(function(ref) {
					vm.showReviewerBtns = true;
					vm.hideRejectedBtn = true;
					alert("Blog rejected");
				})
				.catch(function(err){
					console.log("blog update error: ", err);
				});
			})
			.catch(function(err){
				console.log(err)
			});
	};
    vm.init();
}