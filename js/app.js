angular.module("TechBlog", ["ngRoute", "textAngular", "firebase"])
	.run(["$rootScope", function($rootScope){
		  // Initialize Firebase
			var config = {
				apiKey: "AIzaSyBeNnqTYLjAaMfbldZqjmMXOdKWrG1CKek",
				authDomain: "techblog-4bb01.firebaseapp.com",
				databaseURL: "https://techblog-4bb01.firebaseio.com",
				storageBucket: "techblog-4bb01.appspot.com",
				messagingSenderId: "435978073211"
			};
			firebase.initializeApp(config);

			$rootScope.$on("$locationChangeStart", function(event, next, current) { 
				$rootScope.menuValue = next.split('#')[1];
    });
	}])    
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
			controllerAs: "addblogctrl"
		  }).
		  when("/allblog", {
			templateUrl: 'template/All-blogs/allblogs.html',
			controller: "AllBlogController",
			controllerAs: "allblogctrl"
		  }).
		  when("/blogdetails/:blogId", {
			templateUrl: 'template/Blog-details/BlogDetails.html',
			controller: "BlogDetsController",
			controllerAs: "blogDetsCtrl"
		  }).
		  otherwise({
			redirectTo: "/login"
		  });
	}]);