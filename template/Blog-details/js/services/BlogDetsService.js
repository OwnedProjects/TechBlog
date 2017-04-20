angular.module("TechBlog")
	.controller("BlogDetsService", BlogDetsService);

BlogDetsService.$inject = ["$firebaseArray", "$timeout"];

function BlogDetsService($firebaseArray, $timeout){
    var vm = this;
};