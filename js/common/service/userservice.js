angular.module("GitBlog")
	.service("UserService", UserService);

UserService.$inject = ["$rootScope"];

function UserService($rootScope){
	var vm = this;
	vm.validUser = null;
	vm.checkUser = checkUser;
	vm.setUser = setUser;
	
	function checkUser(){
		if(sessionStorage.getItem("validUser")){
			vm.validUser = sessionStorage.getItem("validUser");
			return vm.validUser;
		}
		else{
			return vm.validUser;
		}
	}
	
	function setUser(){
		sessionStorage.setItem("validUser", true);
		vm.validUser = true;
	}
}