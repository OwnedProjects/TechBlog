angular.module("TechBlog")
 .controller("NavController", NavController);

angular.module("TechBlog")
  .component("showBlog",{
      //bindings: { name: '@' },
      //require: {
      //  parent: '^parentComponent'
      //},
	  bindings: {
		userid: '@'
	  },
      controller: function ($firebaseArray) {
            var vm = this;
            vm.BlogsData = null;
            //console.log("In component");
			//console.log("User Id "+ vm.userid);
            vm.currentUser = firebase.auth().currentUser;
            //Fetch all blogs
            vm.currentUserBlogRef = firebase.database().ref().child('/blog-post').orderByChild('userId').equalTo(vm.userid);
            vm.blogs = $firebaseArray(vm.currentUserBlogRef);
            //console.log(vm.blogs);    
            // vm.currentBlogRef = firebase.database().ref('/blog-post/' + ).once('value').then(function(snapshot) {
            //     //var username = snapshot.val().username;
            //     console.log(snapshot.val())
            // });
            // vm.blogsRef = firebase.database().ref().child('/blog-post');
            // vm.blogs = $firebaseArray(vm.blogsRef);
      },
      controllerAs: 'componentctrl',
      templateUrl: "template/My-profile/component/BlogComponent.html"
  });