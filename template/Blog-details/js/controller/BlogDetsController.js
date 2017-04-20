angular.module("TechBlog")
	.controller("BlogDetsController", BlogDetsController);

BlogDetsController.$inject = ["$firebaseArray", "$rootScope", "$location", "$routeParams", "$timeout"];

function BlogDetsController($firebaseArray, $rootScope, $location, $routeParams, $timeout){
    // variables defined
    var vm = this;
    vm.blogdets = null;
    vm.blogid = null;
    vm.currentUser = null;
    vm.userDets = null;
    vm.user = null;
    vm.selfProfile = false;
    vm.showcommentSection = false;
	vm.showReviewerBtns = false;
	vm.hideRejectedBtn = false;
	vm.showReviewer = false;
	vm.reviewerDets = false;
    vm.commentRef = null;
    vm.comments = null;
	vm.noVotesYet = false;
    vm.positiveLikes = 0;
    vm.negativeLikes = 0;
    vm.votes = {"likes": false, "dislikes": false};
    vm.init = init;
    vm.postComment = postComment;
    vm.writeAComment = writeAComment;
    vm.loadProfile = loadProfile;
    vm.approveBlog = approveBlog;
    vm.rejectBlog = rejectBlog;
    vm.changeMyReviewer = changeMyReviewer;
    vm.shuffleUsers = shuffleUsers;
    vm.modifyViewCount = modifyViewCount;
    vm.voteUp = voteUp;
    vm.voteDown = voteDown;
    vm.getCurrUserVotes = getCurrUserVotes;
    vm.calcVoteProgress = calcVoteProgress;

    function init(){
        vm.user = $rootScope.user;
		vm.currentUser = firebase.auth().currentUser;
        vm.userRef = firebase.database().ref().child('/users').orderByChild('uid').equalTo(vm.currentUser.uid);
		vm.userData = $firebaseArray(vm.userRef);
		vm.userData.$loaded()
            .then(function(snapshot){
                vm.userDets = snapshot[0];
			})
			.catch(function(err){
				console.log(err)
			});
		
        vm.rootRef = firebase.database().ref().child('/blog-post').orderByChild('bloglink').equalTo($routeParams.blogId);
        vm.blogdata = $firebaseArray(vm.rootRef);
        vm.blogdata.$loaded()
            .then(function(snapshot){
                var list = snapshot;
                vm.blogdets = snapshot[0];
                vm.blogid = snapshot[0].blogid;

				if(vm.userDets.rank == 'reviewer' && vm.currentUser.uid != vm.blogdets.userId && vm.blogdets.approvalStatus!='approved')
				{
					vm.showReviewerBtns = true;
					if(vm.blogdets.approvalStatus == 'rejected'){
						vm.hideRejectedBtn = true;
					}
				}else{
					vm.showReviewerBtns = false;
					if(vm.blogdets.approvalStatus == 'pending'){
						vm.reviewerRef = firebase.database().ref().child('/users').orderByChild('uid').equalTo(vm.blogdets.reviewerId);
						vm.reviewerData = $firebaseArray(vm.reviewerRef);
						vm.reviewerData.$loaded()
							.then(function(snapshot){
								vm.reviewerDets = snapshot[0]
								vm.showReviewer = true;
							})
							.catch(function(err){
								console.log(err)
							});
					}
				}
			
				if(vm.currentUser.uid != vm.blogdets.userId){
					//console.log("No Self Profile");
					vm.selfProfile = false;
					vm.modifyViewCount(list);
				}
				else{
					vm.selfProfile = true;
				}
                vm.commentRef = firebase.database().ref().child('/blog-comments').orderByChild('blogid').equalTo(vm.blogid);
                vm.comments = $firebaseArray(vm.commentRef);
                //console.log(vm.comments);
				vm.getCurrUserVotes();
				vm.calcVoteProgress();
            })
            .catch(function(err){
                console.log("Error: ", err)
            });
    };

	function changeMyReviewer(){
		vm.userRef = firebase.database().ref().child('/users').orderByChild('rank').equalTo('reviewer');
		vm.userData = $firebaseArray(vm.userRef);
		vm.userData.$loaded()
            .then(function(snapshot){
				vm.reviewer = vm.shuffleUsers(angular.copy(snapshot), vm.currentUser.uid, vm.reviewerDets.uid);
				
				/** Updating new Reviewer */
				vm.rootRef = firebase.database().ref().child('/blog-post').orderByChild('bloglink').equalTo($routeParams.blogId);
				vm.blogdata = $firebaseArray(vm.rootRef);
				vm.blogdata.$loaded()
					.then(function(snapshot){
						var list = snapshot;
						list[0].reviewerId = vm.reviewer.uid;
						list.$save(0).then(function(ref) {
							alert("Reviewer Modified");
							vm.reviewerDets = vm.reviewer;
						})
						.catch(function(err){
							console.log("blog update error: ", err);
						});
					})
					.catch(function(err){
						console.log(err)
					});
			})
			.catch(function(err){
				console.log(err);
			});
	}
	
	function shuffleUsers(array, currUid, reviewerId) {
		var currentIndex = array.length, temporaryValue, randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		
		if(array[0].uid == currUid){
			if(array[1].uid == reviewerId)
			{
				return array[2];
			}
			else{
				return array[1];
			}
		}
		else if(array[0].uid == reviewerId){			
			if(array[1].uid == currUid)
			{
				return array[2];
			}
			else{
				return array[1];
			}
		}
		else {			
			return array[0];
		}
	};
	
    function loadProfile(profUid){
        sessionStorage.setItem("profileUser", profUid);
        $location.path("/myprofile");
    };

    function postComment(){
        var dt = new Date();
        var commentData = {
            "blogid": vm.blogid,
            "comment": vm.commentdet,
			"userId": $rootScope.user.uid,
            "username": $rootScope.user.displayName,
            "userPic": $rootScope.user.photoURL,
            "cmntdate": dt.getTime()
		};

        vm.comments.$add(commentData);
        vm.commentdet = null;
        vm.showcommentSection = false;
    };

    function writeAComment(){
        console.log($rootScope.user);
        if(vm.user){
            vm.showcommentSection = true;
            $timeout(function(){
                window.scroll(0,(window.innerHeight*2));
            },200);
        }
        else{
            $location.path("/");
        }
    }
    
	function approveBlog(){
		vm.rootRef = firebase.database().ref().child('/blog-post').orderByChild('bloglink').equalTo($routeParams.blogId);
        vm.blogdata = $firebaseArray(vm.rootRef);
		vm.blogdata.$loaded()
            .then(function(snapshot){
				var list = snapshot;
				list[0].approvalStatus = "approved";
				list.$save(0).then(function(ref) {
					vm.showReviewerBtns = false;
					alert("Blog approved");
				})
				.catch(function(err){
					console.log("blog update error: ", err);
				});
			})
			.catch(function(err){
				console.log(err)
			});
	};
	
	function rejectBlog(){
		vm.rootRef = firebase.database().ref().child('/blog-post').orderByChild('bloglink').equalTo($routeParams.blogId);
        vm.blogdata = $firebaseArray(vm.rootRef);
		vm.blogdata.$loaded()
            .then(function(snapshot){
				var list = snapshot;
				list[0].approvalStatus = "rejected";
				list.$save(0).then(function(ref) {
					vm.showReviewerBtns = true;
					vm.hideRejectedBtn = true;
					alert("Blog rejected");
				})
				.catch(function(err){
					console.log("blog update error: ", err);
				});
			})
			.catch(function(err){
				console.log(err)
			});
	};
	
	function modifyViewCount(list){
		list[0].views = list[0].views + 1;
		list.$save(0).then(function(ref) {
			//console.log("View count updated");
		})
		.catch(function(err){
			console.log("blog update error: ", err);
		});
	};
	
	function voteUp(){
		if(vm.selfProfile == false){
			//Vote up
			if(vm.votes.likes != true){
				vm.votesRef = firebase.database().ref().child('/blog-votes').orderByChild('blogid').equalTo(vm.blogdets.blogid);
				vm.blogvotesdata = $firebaseArray(vm.votesRef);
				vm.blogvotesdata.$loaded()
				.then(function(snapshot){
					if(snapshot.length == 0){
						//None of the users have voted for this blog, first vote.
						var voteData = {
							"blogid": vm.blogdets.blogid,
							"uid": vm.currentUser.uid,
							"likes" : true,
							"dislikes" : false,
						};
						vm.rootRef = firebase.database().ref().child('/blog-post').orderByChild('bloglink').equalTo($routeParams.blogId);
						vm.blogdata = $firebaseArray(vm.rootRef);
						vm.blogdata.$loaded()
							.then(function(blogsnapshot){
								var list = blogsnapshot;
								list[0].likes = list[0].likes + 1;
								list.$save(0).then(function(ref) {
									//console.log("Likes count updated");
									vm.votes.likes = true;
									vm.votes.dislikes = false;
									vm.blogvotesdata.$add(voteData);
									
									vm.noVotesYet = false;
									vm.calcVoteProgress();
								})
								.catch(function(err){
									console.log("blog-post | vote update error: ", err);
								});
							})
							.catch(function(err){
								console.log("fetch Blog err", err)
							});
					}
					else{
						//console.log(snapshot.length, snapshot);
						var tmpData = null, index = -1;
						for(var i=0; i<snapshot.length; i++){
							if(snapshot[i].uid == vm.currentUser.uid && snapshot[i].blogid == vm.blogdets.blogid){
								tmpData = snapshot[i];
								index = i;
								break;
							}
						}
						if(tmpData != null){
							//user have already voted for this blog.
							vm.rootRef = firebase.database().ref().child('/blog-post').orderByChild('bloglink').equalTo($routeParams.blogId);
							vm.blogdata = $firebaseArray(vm.rootRef);
							vm.blogdata.$loaded()
							.then(function(blogsnapshot){
								var list = blogsnapshot;
								if(list[0].dislikes > 0){
									list[0].dislikes = list[0].dislikes - 1;
								}
								list[0].likes = list[0].likes + 1;
								list.$save(0).then(function(ref) {
									//console.log("Likes count updated");
									
									vm.noVotesYet = false;
									vm.calcVoteProgress();
								})
								.catch(function(err){
									console.log("blog-post | vote update error: ", err);
								});
							})
							.catch(function(err){
								console.log("fetch Blog err", err)
							});
								
							var list = snapshot;
								list[index].likes = true;
								list[index].dislikes = false;
								list.$save(0).then(function(ref) {
									//console.log("DisLike changed to Like | updated");
									vm.votes.likes = true;
									vm.votes.dislikes = false;
								})
								.catch(function(err){
									console.log("blog-votes | vote update error: ", err);
								});
						}
						else{
							//user has still not voted for this blog.
							var voteData = {
								"blogid": vm.blogdets.blogid,
								"uid": vm.currentUser.uid,
								"likes" : true,
								"dislikes" : false,
							};
							vm.rootRef = firebase.database().ref().child('/blog-post').orderByChild('bloglink').equalTo($routeParams.blogId);
							vm.blogdata = $firebaseArray(vm.rootRef);
							vm.blogdata.$loaded()
							.then(function(blogsnapshot){
								var list = blogsnapshot;
								list[0].likes = list[0].likes + 1;
								list.$save(0).then(function(ref) {
									//console.log("Likes count updated");
									vm.votes.likes = true;
									vm.votes.dislikes = false;
									vm.blogvotesdata.$add(voteData);
									
									vm.noVotesYet = false;
									vm.calcVoteProgress();
								})
								.catch(function(err){
									console.log("blog-post | vote update error: ", err);
								});
							})
							.catch(function(err){
								console.log("fetch Blog err", err)
							});
						}
					}
				})
				.catch(function(err){
					console.log(err)
				});
			}
			//else - cannot vote again 
		}else{
			alert("Sorry you cannot vote your own post");
		}
	};
	
	function voteDown(){
		if(vm.selfProfile == false){
			//Vote up
			if(vm.votes.dislikes != true){
				vm.votesRef = firebase.database().ref().child('/blog-votes').orderByChild('blogid').equalTo(vm.blogdets.blogid);
				vm.blogvotesdata = $firebaseArray(vm.votesRef);
				vm.blogvotesdata.$loaded()
				.then(function(snapshot){
					if(snapshot.length == 0){
						//None of the users have voted for this blog, first vote.
						var voteData = {
							"blogid": vm.blogdets.blogid,
							"uid": vm.currentUser.uid,
							"likes" : false,
							"dislikes" : true,
						};
						vm.rootRef = firebase.database().ref().child('/blog-post').orderByChild('bloglink').equalTo($routeParams.blogId);
						vm.blogdata = $firebaseArray(vm.rootRef);
						vm.blogdata.$loaded()
							.then(function(blogsnapshot){
								var list = blogsnapshot;
								list[0].dislikes = list[0].dislikes + 1;
								list.$save(0).then(function(ref) {
									//console.log("dislikes count updated");
									vm.votes.likes = false;
									vm.votes.dislikes = true;
									vm.blogvotesdata.$add(voteData);
									
									vm.noVotesYet = false;
									vm.calcVoteProgress();
								})
								.catch(function(err){
									console.log("blog-post | vote update error: ", err);
								});
							})
							.catch(function(err){
								console.log("fetch Blog err", err)
							});
					}
					else{
						//console.log(snapshot.length, snapshot);
						var tmpData = null, index = -1;
						for(var i=0; i<snapshot.length; i++){
							if(snapshot[i].uid == vm.currentUser.uid && snapshot[i].blogid == vm.blogdets.blogid){
								tmpData = snapshot[i];
								index = i;
								break;
							}
						}
						if(tmpData != null){
							//user have already voted for this blog.
							vm.rootRef = firebase.database().ref().child('/blog-post').orderByChild('bloglink').equalTo($routeParams.blogId);
							vm.blogdata = $firebaseArray(vm.rootRef);
							vm.blogdata.$loaded()
							.then(function(blogsnapshot){
								var list = blogsnapshot;
								if(list[0].likes > 0){
									list[0].likes = list[0].likes - 1;
								}
								list[0].dislikes = list[0].dislikes + 1;
								list.$save(0).then(function(ref) {
									//console.log("dislikes count updated");
									vm.noVotesYet = false;
									vm.calcVoteProgress();
								})
								.catch(function(err){
									console.log("blog-post | vote update error: ", err);
								});
							})
							.catch(function(err){
								console.log("fetch Blog err", err)
							});
								
							var list = snapshot;
								list[index].likes = false;
								list[index].dislikes = true;
								list.$save(0).then(function(ref) {
									//console.log("DisLike changed to Like | updated");
									vm.votes.likes = false;
									vm.votes.dislikes = true;
								})
								.catch(function(err){
									console.log("blog-votes | vote update error: ", err);
								});
						}
						else{
							//user has still not voted for this blog.
							var voteData = {
								"blogid": vm.blogdets.blogid,
								"uid": vm.currentUser.uid,
								"likes" : false,
								"dislikes" : true,
							};
							vm.rootRef = firebase.database().ref().child('/blog-post').orderByChild('bloglink').equalTo($routeParams.blogId);
							vm.blogdata = $firebaseArray(vm.rootRef);
							vm.blogdata.$loaded()
							.then(function(blogsnapshot){
								var list = blogsnapshot;
								list[0].dislikes = list[0].dislikes + 1;
								list.$save(0).then(function(ref) {
									//console.log("dislikes count updated");
									vm.votes.likes = false;
									vm.votes.dislikes = true;
									vm.blogvotesdata.$add(voteData);
									vm.noVotesYet = false;
									vm.calcVoteProgress();
								})
								.catch(function(err){
									console.log("blog-post | vote update error: ", err);
								});
							})
							.catch(function(err){
								console.log("fetch Blog err", err)
							});
						}
					}
				})
				.catch(function(err){
					console.log(err)
				});
			}
			//else - cannot vote again 
		}else{
			alert("Sorry you cannot vote your own post");
		}
	};
	
	function getCurrUserVotes(){
		vm.votesRef = firebase.database().ref().child('/blog-votes').orderByChild('blogid').equalTo(vm.blogdets.blogid);
				vm.blogvotesdata = $firebaseArray(vm.votesRef);
				vm.blogvotesdata.$loaded()
				.then(function(snapshot){
					if(snapshot.length == 0){
						vm.votes = {"likes": false, "dislikes": false};
						console.log("No votes yet");
						vm.noVotesYet = true;
					}
					else{
						//console.log(vm.currentUser.uid, snapshot);
						for(var i=0; i<snapshot.length; i++){
							if(snapshot[i].uid == vm.currentUser.uid && snapshot[i].blogid == vm.blogdets.blogid){
								if(snapshot[i].likes == true){
									vm.votes.likes = true;
									vm.votes.dislikes = false;
								}
								else if(snapshot[i].dislikes == true){
									vm.votes.likes = false;
									vm.votes.dislikes = true;
								}
								break;
							}
						}
						
					}
				})
				.catch(function(err){
					console.log("blog-vote | Cannot find user votes", err);
				})
	};
	
	function calcVoteProgress(){
		vm.rootRef = firebase.database().ref().child('/blog-post').orderByChild('blogid').equalTo(vm.blogdets.blogid);
        vm.blogdata = $firebaseArray(vm.rootRef);
        vm.blogdata.$loaded()
            .then(function(snapshot){
				var blogdets = snapshot[0];
				var totalLikes = parseInt(blogdets.likes) + parseInt(blogdets.dislikes);
				var positiveLikes = (parseInt(blogdets.likes)/totalLikes) * 100;
				var negativeLikes = (parseInt(blogdets.dislikes)/totalLikes) * 100;
				vm.positiveLikes = {width : positiveLikes+"%"};
				vm.negativeLikes = {width : negativeLikes+"%"};
			})
			.catch(function(err){
				console.log("blog-post | Cannot fetch likes/dislikes count");
			});
	};
    vm.init();
}