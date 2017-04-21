angular.module("TechBlog")
	.service("UserService", UserService);

UserService.$inject = ["$q", "$http", "$firebaseArray"];

function UserService($q, $http, $firebaseArray){
	var vm = this;
	vm.getUserDets = getUserDets;
	vm.getBlogDetReviewer = getBlogDetReviewer;
	vm.getReviewerOrderByRank = getReviewerOrderByRank;
	
	function getUserDets(uid){
		return $q(function(resolve, reject) {
			var userRef = firebase.database().ref().child('/users').orderByChild('uid').equalTo(uid);
			var userData = $firebaseArray(userRef);
			userData.$loaded()
				.then(function(snapshot){
					resolve(snapshot[0]);
				})
				.catch(function(err){
					reject(err)
				});
		}); //$q ends
	};

	function getBlogDetReviewer(reviewerId){
		return $q(function(resolve, reject) {
			var reviewerRef = firebase.database().ref().child('/users').orderByChild('uid').equalTo(reviewerId);
			var reviewerData = $firebaseArray(reviewerRef);
			reviewerData.$loaded()
				.then(function(snapshot){
					resolve(snapshot[0]);
				})
				.catch(function(err){
					reject(err)
				});
		}); //$q ends
	};

	function getReviewerOrderByRank(reviewerType){
		return $q(function(resolve, reject) {
			var userRef = firebase.database().ref().child('/users').orderByChild('rank').equalTo('reviewer');
			var userData = $firebaseArray(userRef);
			userData.$loaded()
				.then(function(snapshot){
					resolve(snapshot)
				})
				.catch(function(err){
					reject(err);
				})
		}); //$q ends
	};
}