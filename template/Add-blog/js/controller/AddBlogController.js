angular.module("TechBlog")
	.controller("AddBlogController", AddBlogController);

AddBlogController.$inject = ["$firebaseArray", "$rootScope", "$location"];

function AddBlogController($firebaseArray, $rootScope, $location){
    var vm = this;
    vm.showTitleInst = false;
    vm.showFormatInst = false;
    vm.showTagInst = false;
    vm.rootRef = null;
    vm.blogs = null;
    vm.rootRefBlogLinks = null;
    vm.bloglinks = null;
    vm.titlePresent = false;
    vm.init = init;
    vm.showInstruction = showInstruction;
    vm.createNewBlog = createNewBlog;
    vm.checkTitlePresence = checkTitlePresence;

    function init(){
    }
    vm.init = function(){
       if(!$rootScope.user){
           $location.path('/');
       }
       else{
            vm.rootRef = firebase.database().ref().child('/blog-post');
			vm.blogs = $firebaseArray(vm.rootRef);
			vm.rootRefBlogLinks = firebase.database().ref().child('/blog-links');
            vm.bloglinks = $firebaseArray(vm.rootRefBlogLinks);
       }
    }

    function showInstruction(a){
        a = true;
    }

    function checkTitlePresence(){
        if(vm.blogTitle){
            var titleLink = vm.blogTitle.toLowerCase().split(" ").join("-");
            console.log(titleLink);
            vm.checkTitleDB = firebase.database()
                        .ref().child('/blog-links')
                        .orderByChild('link')
                        .equalTo(titleLink.toString())
                        .once('value')
                .then(function(snapshot){
                    if(snapshot.val() != null){
                    vm.titlePresent = true;
                    //alert("Title is present need to show a popup");
                    }
                    else{
                        vm.titlePresent = false;
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
            "userId": $rootScope.user.uid,
            "username": $rootScope.user.displayName,
            "userPic": $rootScope.user.photoURL,
            "views": 0,
            "likes": 0,
			"blogdate": dt.getTime()
		};

		var bloglinkdata = {
			"link": titleLink,
			"blogTitle":vm.blogTitle,
			"blogdate": dt.getTime()
		};
        console.log(postData)
        console.log(bloglinkdata)
		vm.blogs.$add(postData);
		vm.bloglinks.$add(bloglinkdata);
    }
    vm.init();
}