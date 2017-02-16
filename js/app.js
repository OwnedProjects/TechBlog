angular.module("TechBlog", ["ngRoute"])    
	.config(["$routeProvider",
		function($routeProvider) {
		$routeProvider.
		  when("/login", {
			templateUrl: 'template/Login/login.html',
			controller: "LoginController",
			controllerAs: 'loginctrl'
		  }).
		  when("/addblog", {
			templateUrl: 'template/Add-blog/add-blog.html',
			controller: "AddBlogController",
			controllerAs: "addctrl"
		  }).
		  when("/allblog", {
			templateUrl: 'template/All-blogs/allblogs.html',
			controller: "AllBlogController",
			controllerAs: "allblogctrl"
		  }).
		  otherwise({
			redirectTo: "/login"
		  });
	}]);