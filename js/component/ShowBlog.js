angular.module("TechBlog")
 .controller("NavController", NavController);

angular.module("TechBlog")
  .component("showBlog",{
      //templateUrl: "showBlog.html",
      //bindings: { name: '@' },
      //require: {
      //  parent: '^parentComponent'
      //},
      controller: function () {
            var vm = this;
            vm.BlogsData = null;
            vm.currentUser = firebase.auth().currentUser;
            //Fetch all blogs
            
            vm.currentBlogRef = firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
                var username = snapshot.val().username;
            });
            // vm.blogsRef = firebase.database().ref().child('/blog-post');
            // vm.blogs = $firebaseArray(vm.blogsRef);
      }
  });