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
	vm.image_upload = image_upload;
	vm.getImageURL = getImageURL;

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
		
		$firebaseAuth().$onAuthStateChanged(function(authData) {
			if (authData) {
				if(authData.uid != "c1QDdN6PkXVJIggZDHt8wTVHnyp2"){
					$location.path('/');
				}
				$rootScope.isLoggedIn = true;
			}
			else {
				$rootScope.isLoggedIn = false;
			}
		});
		
		if($rootScope.isLoggedIn){
			vm.rootRef = firebase.database().ref().child('/blog-post');
			vm.blogs = $firebaseArray(vm.rootRef);
			vm.rootRefBlogLinks = firebase.database().ref().child('/blog-links');
			vm.bloglinks = $firebaseArray(vm.rootRefBlogLinks);
			vm.image_upload();
		}
		else{
			$location.path('/login');
		}
	};

	function addPost(){
		var titleLink = vm.blogtitle.split(" ").join("-");
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

	function image_upload(){
		var uploader = document.getElementById('uploader');
		var fileButton = document.getElementById('fileButton');

		fileButton.addEventListener('change', function(e){
			//Get file
			var file = e.target.files[0];

			//Create a storage ref
			var dt = new Date();
			var storageRef = firebase.storage().ref(dt.getTime() + file.name);

			//Upload file
			var task = storageRef.put(file);

			//Update progress bar
			task.on('state_changed',
				function progress(snapshot) {
					var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					uploader.value = percentage;
				},
				function error(err) {
					console.log(err)
				},
				function complete() {
					vm.linkRefs.push(dt.getTime() + file.name);
					vm.uploadPopUp = null;
					$timeout(function(){
						console.log("Pop Up");
						PopUp.success("Image upload success");
					},100)
					console.log("completed")
				}
			);
		});
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