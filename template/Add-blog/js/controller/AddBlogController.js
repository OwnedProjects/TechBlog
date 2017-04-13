angular.module("TechBlog")
	.controller("AddBlogController", AddBlogController);

AddBlogController.$inject = ["$firebaseArray", "$rootScope", "$location", "$timeout"];

function AddBlogController($firebaseArray, $rootScope, $location, $timeout){
    var vm = this;
    vm.showTitleInst = true;
    vm.showFormatInst = true;
    vm.showTagInst = false;
    vm.rootRef = null;
    vm.blogs = null;
    vm.rootRefBlogLinks = null;
    vm.bloglinks = null;
    vm.titlePresent = false;
	vm.reviewer = null;
    vm.showReviewerMessage = false;
    vm.init = init;
    vm.showInstruction = showInstruction;
    vm.createNewBlog = createNewBlog;
    vm.checkTitlePresence = checkTitlePresence;
    vm.shuffleUsers = shuffleUsers;

    function init(){
        if(!$rootScope.user){
           $location.path('/');
        }
        else{
            vm.rootRef = firebase.database().ref().child('/blog-post');
			vm.blogs = $firebaseArray(vm.rootRef);
        }
    }

    function showInstruction(a){
        a = true;
    }

    function checkTitlePresence(){
        if(vm.blogTitle){
            var titleLink = vm.blogTitle.toLowerCase().split(" ").join("-");
            firebase.database()
                        .ref().child('/blog-post')
                        .orderByChild('bloglink')
                        .equalTo(titleLink.toString())
                        .once('value')
                .then(function(snapshot){
                    //console.log(snapshot.val())
                    if(snapshot.val() != null){
                    $timeout(function(){
                        vm.titlePresent = true;
                    },100);
                    //alert("Title is present need to show a popup");
                    }
                    else{
                        $timeout(function(){
                            vm.titlePresent = false;
                        },100);
                    }
                });
        }
    };

    function createNewBlog(){
		/* Fetching Reviewers list */
		vm.currentUser = firebase.auth().currentUser;
        vm.userRef = firebase.database().ref().child('/users').orderByChild('rank').equalTo('reviewer');
		vm.userData = $firebaseArray(vm.userRef);
		vm.userData.$loaded()
            .then(function(snapshot){
				vm.reviewer = vm.shuffleUsers(angular.copy(snapshot), vm.currentUser.uid);
				var titleLink = vm.blogTitle.toLowerCase().split(" ").join("-");
				var dt = new Date();
				var postData = {
					"blogid": $rootScope.user.uid+dt.getTime(),
					"bloglink":titleLink,
					"title":vm.blogTitle,
					"content":vm.content,
					"technologies": vm.technologies,
					"userId": $rootScope.user.uid,
					"username": $rootScope.user.displayName,
					"userPic": $rootScope.user.photoURL,
					"views": 0,
					"likes": 0,
					"approvalStatus": "pending",
					"blogdate": dt.getTime(),
					"reviewerId": vm.reviewer.uid
				};

					firebase.database()
								.ref().child('/blog-post')
								.orderByChild('bloglink')
								.equalTo(titleLink.toString())
								.once('value')
						.then(function(snapshot){
							//console.log(snapshot.val())
							if(snapshot.val() != null){
							$timeout(function(){
								vm.titlePresent = true;
								alert("Title already there kindly change the title");
							},100);
							//alert("Title is present need to show a popup");
							}
							else{
								$timeout(function(){
									vm.blogs.$add(postData);
									vm.showReviewerMessage = true;
									$location.path("/");
								},100);
							}
						});
			})
			.catch(function(err){
				console.log(err)
			});
    }
	
	function shuffleUsers(array, currUid) {
		var currentIndex = array.length, temporaryValue, randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		
		if(array[0].uid == currUid){
			return array[1];
		}
		else{			
			return array[0];
		}
	}
    vm.init();
}