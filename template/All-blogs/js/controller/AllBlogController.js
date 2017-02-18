angular.module("TechBlog")
	.controller("AllBlogController", AllBlogController);

AllBlogController.$inject = ["$firebaseArray","$rootScope", "$location"];

function AllBlogController($firebaseArray, $rootScope, $location){
    var vm = this;
    vm.usersRef = null;
    vm.users = null;
    vm.findUserRootRef = null;
    vm.init = init;

    function init(){
<<<<<<< HEAD
        $rootScope.setActiveMenu();
=======
        var user = $rootScope.user;
        if(!user){
            $location.path('/');
        }
        else{
            vm.usersRef = firebase.database().ref().child('/users');
            vm.users = $firebaseArray(vm.usersRef);
            vm.currentUID = user.uid;
            console.log(vm.currentUID);
            vm.findUserRootRef = firebase.database()
                    .ref().child('/users')
                    .orderByChild('uid')
                    .equalTo(vm.currentUID)
                    .once('value')
            .then(function(snapshot){
                if(snapshot.val() != null){
                   console.log(snapshot.val());
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
        //vm.isUser = $firebaseArray(vm.findUserRootRef);
        //console.log(vm.isUser)
>>>>>>> 68997d0987989c9a6b340c107291ca3cd93f20be
    };

    vm.init();
}