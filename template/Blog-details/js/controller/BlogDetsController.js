angular.module("TechBlog")
	.controller("BlogDetsController", BlogDetsController);

BlogDetsController.$inject = ["$firebaseArray", "$rootScope", "$location", "$routeParams", "$timeout"];

function BlogDetsController($firebaseArray, $rootScope, $location, $routeParams, $timeout){
    // variables defined
    var vm = this;
    vm.blogdets = null;
    vm.blogid = null;
    vm.user = null;
    vm.showcommentSection = false;
    vm.commentRef = null;
    vm.comments = null;
    vm.init = init;
    vm.postComment = postComment;
    vm.writeAComment = writeAComment;

    function init(){
        vm.user = $rootScope.user;
        vm.rootRef = firebase.database().ref().child('/blog-post').orderByChild('bloglink').equalTo($routeParams.blogId);
        vm.blogdata = $firebaseArray(vm.rootRef);
        vm.blogdata.$loaded()
            .then(function(snapshot){
                vm.blogdets = snapshot[0];
                vm.blogid = snapshot[0].blogid;

                vm.commentRef = firebase.database().ref().child('/blog-comments').orderByChild('blogid').equalTo(vm.blogid);
                vm.comments = $firebaseArray(vm.commentRef);
                console.log(vm.comments);
            })
            .catch(function(err){
                console.log("Error: ", err)
            });
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
    
    vm.init();
}