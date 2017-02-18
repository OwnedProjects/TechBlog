angular.module("TechBlog", ["ngRoute", "textAngular"])    
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
		  when("/blogdetails", {
			templateUrl: 'template/Blog-details/BlogDetails.html',
			controller: "BlogDetsController",
			controllerAs: "blogDetsCtrl"
		  }).
		  otherwise({
			redirectTo: "/login"
		  });
	}]);