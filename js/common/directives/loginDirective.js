angular.module('GitBlog')
.directive('loginDirective', ['$log', '$firebaseAuth', '$rootScope', '$location', function ($log, $firebaseAuth, $rootScope, $location) {
	return {
		link: function (scope, elem, attrs) {
			$firebaseAuth().$onAuthStateChanged(function(authData) {
			if (authData) {
				$rootScope.userData=authData;
				$rootScope.isLoggedIn = true;
			}
			else {
				$rootScope.userData=null;
				$rootScope.isLoggedIn = false;
			}
		});
		},
		controller: function() {
			var vm=this;
			vm.logout = logout;
			vm.login = login;
			
			function logout() {
				firebase.auth().signOut();
			}
			
			function login() {
				$location.path('/login');
			}
		},
		controllerAs:'loginCtrl',
		templateUrl: 'js/common/directives/loginDirective.html',
		restrict: 'EA'
	};
}]);