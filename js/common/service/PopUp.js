angular.module("GitBlog")
	.service("PopUp", PopUp);

PopUp.$inject = ["$rootScope", "$timeout"];

function PopUp($rootScope, $timeout){
	var vm = this;
	vm.success = success;
	vm.error = error;
	
	function success(msg, time){
		$rootScope.successMessage = msg;
		
		$timeout(function(){
			$rootScope.successMessage = null;
		},time);
	}
	
	function error(msg){
		$rootScope.errorMessage = msg;
		
		$timeout(function(){
			$rootScope.errorMessage = null;
		},2000);
	}
}