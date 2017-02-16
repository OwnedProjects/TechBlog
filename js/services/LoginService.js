angular.module("LoginApp")
	.service("LoginService", LoginService);

LoginService.$inject = ["$q", "$http"];

function LoginService($q, $http){
	var vm = this;
	vm.getUsers = getUsers;
	
	function getUsers(){
		return $q(function(resolve, reject) {
			$http({
			  method: 'GET',
			  url: 'js/data/users.json'
			}).then(function successCallback(response) {
				resolve(response.data.users)
			}, function errorCallback(err) {
				reject("File nai mili jabe");
			});//$http ends
		}); //$q ends
	}
}