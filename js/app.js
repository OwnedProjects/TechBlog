angular.module("GitBlog", ["ngRoute", "firebase", "ngAnimate", "ngSanitize"])
	.run(["$rootScope", function($rootScope){
		  // Initialize Firebase
		var config = {
			apiKey: "AIzaSyC-tjUKsmjSW3VGAGnKxEpIZJfciF11We4",
			authDomain: "git-blog-4737d.firebaseapp.com",
			databaseURL: "https://git-blog-4737d.firebaseio.com",
			storageBucket: "git-blog-4737d.appspot.com",
			messagingSenderId: "290011044534"
		};
		firebase.initializeApp(config);
	}])
	.config(['$routeProvider',
		function($routeProvider) {
		$routeProvider.
		  when('/login', {
			templateUrl: 'template/Login/login.html',
			controller: "LoginController",
			controllerAs: 'loginctrl'
		  }).
		  when('/addblog', {
			templateUrl: 'template/Add-blog/add-blog.html',
			controller: "AddBlogController",
			controllerAs: "addctrl"
		  }).
		  when('/allblog', {
			templateUrl: 'template/All-blogs/allblogs.html',
			controller: "AllBlogController",
			controllerAs: "allblogctrl"
		  }).
		  when('/blog-details/:blogId', {
			templateUrl: 'template/Blog-dets/blog-dets.html',
			controller: "BlogDetsController",
			controllerAs: "blogdetctrl"
		  }).
		  otherwise({
			redirectTo: '/login'
		  });
	}]);