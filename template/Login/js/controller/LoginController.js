angular.module("GitBlog")
	.controller("LoginController", LoginController);

LoginController.$inject = ["$firebaseArray", "$firebaseObject", "$scope", "PopUp", "$location", "UserService", "$timeout"];

function LoginController($firebaseArray, $firebaseObject, $scope, PopUp, $location, UserService, $timeout){
	var vm = this;
	vm.userData = null;
	vm.usersRef = null;
	vm.users = null;
	vm.currentUID = null;
	vm.loader = true;
	vm.init = init;
	vm.doLogin = doLogin;
	vm.onAuthStateChanged = onAuthStateChanged;
	
	function init(){
		try{
			vm.usersRef = firebase.database().ref().child('/users');
			vm.users = $firebaseArray(vm.usersRef);
			firebase.auth().onAuthStateChanged(vm.onAuthStateChanged);
		}
		catch(ex){
			console.log(ex);
			PopUp.error("Not able to connect to server.");
		}
	};
	
	function onAuthStateChanged(user) {
		// We ignore token refresh events.
		if (user && vm.currentUID === user.uid) {
			return;
		}
		
		if (user) {
			vm.currentUID = user.uid;
			console.log(vm.currentUID);
			
			vm.findUserRootRef = firebase.database().ref().child('/users').orderByChild('uid').equalTo(vm.currentUID);
			vm.isUser = $firebaseArray(vm.findUserRootRef);
			console.log(vm.isUser);
			$scope.$watch(vm.isUser, function(val){
				$timeout(function(){
					console.log("inside Watch", vm.isUser[0]);
					if(vm.isUser[0] == undefined){
						var tmpUserDets = {
							"uid": user.uid,
							"email": user.email,
							"photoURL": user.photoURL,
							"displayName": user.displayName,
							"trophies": 50
						};
						vm.users.$add(tmpUserDets);
						vm.loader = null;
						$location.path('addblog');
						PopUp.success("Login Successful", 3000);
					}
					else{
						vm.loader = null;
						$location.path('addblog');
						PopUp.success("Login Successful", 3000);
					}
				},3000);
			});
			//vm.blogSortRootRef = firebase.database().ref().child('/blog-comments').orderByChild('blogId').equalTo($routeParams.blogId);
			//vm.blogSort = $firebaseArray(vm.blogSortRootRef);
			// if(user.uid == "c1QDdN6PkXVJIggZDHt8wTVHnyp2"){
			 	//$location.path('addblog');
			// }
			// else{
				//$location.path('allblog');	
			// }
			//writeUserData(user.uid, user.displayName, user.email, user.photoURL);
			//startDatabaseQueries();
		} else {
			vm.loader = null;
			// Set currentUID to null.
			// Display the splash page where you can sign-in.
		}
	}

	function doLogin() {
		var provider = new firebase.auth.GoogleAuthProvider();
    	firebase.auth().signInWithPopup(provider);
	};
	vm.init();
}