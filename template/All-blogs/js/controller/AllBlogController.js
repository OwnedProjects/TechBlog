angular.module("TechBlog")
	.controller("AllBlogController", AllBlogController);

AllBlogController.$inject = ["$firebaseArray","$rootScope", "$location"];

function AllBlogController($firebaseArray, $rootScope, $location){
    var vm = this;
    vm.usersRef = null;
    vm.users = null;
    vm.blogsRef = null;
    vm.blogs = null;
    vm.findUserRootRef = null;
    vm.init = init;

    function init(){
        var user = $rootScope.user;
        if(!user){
            $location.path('/');
        }
        else{
            vm.usersRef = firebase.database().ref().child('/users');
            vm.users = $firebaseArray(vm.usersRef);
            vm.currentUID = user.uid;

            //console.log(vm.currentUID);
            vm.findUserRootRef = firebase.database()
                    .ref().child('/users')
                    .orderByChild('uid')
                    .equalTo(vm.currentUID)
                    .once('value')
            .then(function(snapshot){
                if(snapshot.val() != null){
                   //console.log(snapshot.val());
                }
                else{
                    var tmpUserDets = {
                        "uid": user.uid,
                        "email": user.email,
                        "photoURL": user.photoURL,
                        "displayName": user.displayName,
                        "trophies": 50
                    };
                    vm.users.$add(tmpUserDets);
                }
            });
        }

        //Fetch all blogs
        vm.blogsRef = firebase.database().ref().child('/blog-post');
        vm.blogs = $firebaseArray(vm.blogsRef);
    };

    vm.init();
}