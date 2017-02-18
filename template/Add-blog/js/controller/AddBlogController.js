angular.module("TechBlog")
	.controller("AddBlogController", AddBlogController);

AddBlogController.$inject = ["$firebaseArray", "$rootScope", "$location"];

function AddBlogController($firebaseArray, $rootScope, $location){
    var vm = this;
    vm.showTitleInst = false;
    vm.showFormatInst = false;
    vm.showTagInst = false;
    vm.rootRef = null;
    vm.blogs = null;
    vm.rootRefBlogLinks = null;
    vm.bloglinks = null;
    vm.init = init;
    vm.createNewBlog = createNewBlog;

    function init(){
        $rootScope.setActiveMenu();
    }
    vm.init = function(){
       if(!$rootScope.user){
           $location.path('/');
       }
       else{
            vm.rootRef = firebase.database().ref().child('/blog-post');
			vm.blogs = $firebaseArray(vm.rootRef);
			vm.rootRefBlogLinks = firebase.database().ref().child('/blog-links');
            vm.bloglinks = $firebaseArray(vm.rootRefBlogLinks);
       }
    }

    vm.showInstruction = function(a){
        a = true;
    }

    function createNewBlog(){
        console.log(vm.blogTitle, vm.content);
        var titleLink = vm.blogTitle.toLowerCase().split(" ").join("-");
		var dt = new Date();
		var postData = {
			"bloglink":titleLink,
			"title":vm.blogTitle,
			"content":vm.content,
			"blogdate": dt.getTime()
		};

		var bloglinkdata = {
			"link": titleLink,
			"blogTitle":vm.blogtitle,
			"blogdate": dt.getTime()
		};
        console.log(postData)
        console.log(bloglinkdata)
		//vm.blogs.$add(postData);
		//vm.bloglinks.$add(bloglinkdata);
    }
    vm.init();
}