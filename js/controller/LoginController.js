angular.module("LoginApp", [])
	.controller("LoginController", LoginController);

LoginController.$inject = ["LoginService"];

function LoginController(LoginService){
	var vm = this;
	vm.userData = null;
	vm.successPopup = null;
	vm.errorPopup = null;
	vm.init = init;
	vm.checkLogin = checkLogin;
	vm.checkUser = checkUser;
	
	function init(){
		vm.successPopup = false;
		vm.errorPopup = false;
	}
	
	function checkLogin(){
		LoginService.getUsers()
			.then(function(response){
				vm.userData = response;
				vm.checkUser();
			})
			.catch(function(error){
				console.log('Somthing went wrong!');
			});
	}
	
	function checkUser(){
		var flag = false;
		for(var i=0; i<vm.userData.length; i++){
				console.log(vm.usernm + ", " +vm.userData[i].username + "|" + vm.passwrd + ", "+ vm.userData[i].passwrd);
			if(vm.usernm == vm.userData[i].username && vm.passwrd == vm.userData[i].passwrd){
				flag = true;
				break;
			}
		}
		if(flag == true){
			vm.successPopup = true;
			vm.errorPopup = false;
		}
		else{
			vm.successPopup = false;
			vm.errorPopup = true;	
		}
		
	}
	
	vm.init();
}