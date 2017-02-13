angular.module("GitBlog")
	.service("UserService", UserService);

UserService.$inject = ["$firebaseArray","$rootScope", "$q"];

function UserService($firebaseArray, $rootScope, $q){
	var vm = this;
	vm.validUser = null;
	vm.checkUser = checkUser;
	vm.setUser = setUser;
	
	function checkUser(user, currUsrId){
		return $q(function(resolve, reject) {
			vm.findUserRootRef = firebase.database().ref().child('/users').orderByChild('uid').equalTo(currUsrId);
			vm.isUser = $firebaseArray(vm.findUserRootRef);
			resolve(vm.isUser)
		});
	}
	
	function setUser(){
		sessionStorage.setItem("validUser", true);
		vm.validUser = true;
	}
}