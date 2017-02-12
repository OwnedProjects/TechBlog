angular.module("GitBlog")
	.controller("LoginController", LoginController);

LoginController.$inject = ["$firebaseObject", "$rootScope", "PopUp", "$location", "UserService"];

function LoginController($firebaseObject, $rootScope, PopUp, $location, UserService){
	var vm = this;
	vm.userData = null;
	vm.currentUID = null;
	vm.loader = true;
	vm.init = init;
	vm.doLogin = doLogin;
	vm.onAuthStateChanged = onAuthStateChanged;
	
	function init(){
		try{
			var rootRef = firebase.database().ref().child('/user-master');
			var ref = rootRef.child('/user');
			vm.userData = $firebaseObject(ref);
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
			//console.log(vm.currentUID);
			PopUp.success("Login Successful", 3000);
			UserService.setUser();
			vm.loader = null;
			if(user.uid == "c1QDdN6PkXVJIggZDHt8wTVHnyp2"){
				$location.path('addblog');
			}
			else{
				$location.path('allblog');	
			}
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