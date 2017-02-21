angular.module("TechBlog")
	.controller("AddBlogController", AddBlogController);

AddBlogController.$inject = ["$firebaseArray", "$rootScope", "$location", "$timeout"];

function AddBlogController($firebaseArray, $rootScope, $location, $timeout){
    var vm = this;
    vm.showTitleInst = false;
    vm.showFormatInst = false;
    vm.showTagInst = false;
    vm.rootRef = null;
    vm.blogs = null;
    vm.rootRefBlogLinks = null;
    vm.bloglinks = null;
    vm.titlePresent = false;
    vm.showReviewerMessage = false;
    vm.init = init;
    vm.showInstruction = showInstruction;
    vm.createNewBlog = createNewBlog;
    vm.checkTitlePresence = checkTitlePresence;

    function init(){
        if(!$rootScope.user){
           $location.path('/');
        }
        else{
            vm.rootRef = firebase.database().ref().child('/blog-post');
			vm.blogs = $firebaseArray(vm.rootRef);
        }
    }

    function showInstruction(a){
        a = true;
    }

    function checkTitlePresence(){
        if(vm.blogTitle){
            var titleLink = vm.blogTitle.toLowerCase().split(" ").join("-");
            firebase.database()
                        .ref().child('/blog-post')
                        .orderByChild('bloglink')
                        .equalTo(titleLink.toString())
                        .once('value')
                .then(function(snapshot){
                    //console.log(snapshot.val())
                    if(snapshot.val() != null){
                    $timeout(function(){
                        vm.titlePresent = true;
                    },100);
                    //alert("Title is present need to show a popup");
                    }
                    else{
                        $timeout(function(){
                            vm.titlePresent = false;
                        },100);
                    }
                });
        }
    };

    function createNewBlog(){
        console.log(vm.blogTitle, vm.content);
        var titleLink = vm.blogTitle.toLowerCase().split(" ").join("-");
		var dt = new Date();
        console.log($rootScope.user)
		var postData = {
			"bloglink":titleLink,
			"title":vm.blogTitle,
			"content":vm.content,
            "technologies": vm.technologies,
            "userId": $rootScope.user.uid,
            "username": $rootScope.user.displayName,
            "userPic": $rootScope.user.photoURL,
            "views": 0,
            "likes": 0,
            "approvalStatus": "pending",
			"blogdate": dt.getTime()
		};
        console.log(postData)
            firebase.database()
                        .ref().child('/blog-post')
                        .orderByChild('bloglink')
                        .equalTo(titleLink.toString())
                        .once('value')
                .then(function(snapshot){
                    //console.log(snapshot.val())
                    if(snapshot.val() != null){
                    $timeout(function(){
                        vm.titlePresent = true;
                        alert("Title already there kindly change the title");
                    },100);
                    //alert("Title is present need to show a popup");
                    }
                    else{
                        $timeout(function(){
		                    vm.blogs.$add(postData);
                            vm.showReviewerMessage = true;
                            $location.path("/");
                        },100);
                    }
                });
    }

    vm.init();
}