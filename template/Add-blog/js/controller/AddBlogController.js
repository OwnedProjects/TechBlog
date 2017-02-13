angular.module("GitBlog")
	.controller("AddBlogController", AddBlogController);

AddBlogController.$inject = ["$firebaseObject", "$firebaseArray", "$firebaseAuth", "$rootScope", "PopUp", "$location", "UserService", "$timeout"];

function AddBlogController($firebaseObject, $firebaseArray, $firebaseAuth, $rootScope, PopUp, $location, UserService, $timeout){
	var vm = this;
	vm.rootRef = null;
	vm.linkRefs = null;
	vm.rootRefBlogLinks = null;
	vm.blogs = null;
	vm.bloglinks = null;
	vm.uploadPopUp = null;
	vm.init = init;
	vm.addPost = addPost;
	vm.getImageURL = getImageURL;
	vm.onAuthStateChanged = onAuthStateChanged;

	function init(){
		vm.rootRef = null;
		vm.rootRefBlogLinks = null;
		vm.blogs = null;
		vm.bloglinks = null;
		vm.uploadPopUp = null;
		vm.blogtitle = null;
		vm.blogdata = null;
		vm.blogtags = null;
		vm.linkRefs = new Array();
		
		$firebaseAuth().$onAuthStateChanged(vm.onAuthStateChanged);
	};

	function onAuthStateChanged(authData) {
		if (authData) {
			vm.rootRef = firebase.database().ref().child('/blog-post');
			vm.blogs = $firebaseArray(vm.rootRef);
			vm.rootRefBlogLinks = firebase.database().ref().child('/blog-links');
			vm.bloglinks = $firebaseArray(vm.rootRefBlogLinks);
		}
		else {
			console.log("jump to login");
			//$rootScope.isLoggedIn = false;
			//$location.path('/login');
		}
	};

	function addPost(){
		var titleLink = vm.blogtitle.toLowerCase().split(" ").join("-");
		var dt = new Date();
		var postData = {
			"bloglink":titleLink,
			"title":vm.blogtitle,
			"content":vm.blogdata,
			"blogdate": dt.getTime()
		};

		var bloglinkdata = {
			"link": titleLink,
			"blogTitle":vm.blogtitle,
			"tags": vm.blogtags,
			"blogdate": dt.getTime()
		};
		vm.blogs.$add(postData);
		vm.bloglinks.$add(bloglinkdata);
		PopUp.success("Post added successfully. Add blog page re-initialized");
		vm.init();
		// Write the new post's data simultaneously in the posts list and the user's post list.
	};

	function getImageURL(imgLink){
		var storageRef = firebase.storage().ref();
		storageRef.child(imgLink).getDownloadURL().then(function(url) {
		console.log(url);
		alert('see console for path');
		//url: https://firebasestorage.googleapis.com/v0/b/git-blog-4737d.appspot.com/o/1485767556247Lighthouse.jpg?alt=media&token=5a1c5c66-7062-4c0b-80d0-626adf2902f5
		}).catch(function(error) {
		  // Handle any errors
		  console.log(error)
		});
	};

	vm.init();
}