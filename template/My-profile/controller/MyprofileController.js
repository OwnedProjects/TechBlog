angular.module("TechBlog")
	.controller("MyProfileController", MyProfileController);

MyProfileController.$inject = ["$firebaseArray", "$rootScope", "$timeout"];

function MyProfileController($firebaseArray, $rootScope, $timeout){
    var vm = this;
    vm.tab = 1;
    vm.uploadImgPopUp = false;
    vm.imgURL = null;
    vm.profileUser = null;
    vm.selfProfile = false;
    vm.init = init;
    vm.setTab = setTab;
    vm.isSet = isSet;
    vm.showImageLoader = false;
    vm.showImageUploadPopup = showImageUploadPopup;
	  vm.closepopup = closepopup;
    vm.image_upload = image_upload;
    vm.getImageURL = getImageURL;

    function init(){
      vm.setTab(1);
      vm.user = $rootScope.user;
      vm.profileUser = sessionStorage.getItem("profileUser");
      sessionStorage.removeItem("profileUser");
      
      vm.userRef = firebase.database().ref().child('/users').orderByChild('uid').equalTo(vm.profileUser);
      vm.userData = $firebaseArray(vm.userRef);
      vm.userData.$loaded()
            .then(function(snapshot){
                vm.userDets = snapshot[0];
                //console.log(vm.userDets);
            })
            .catch(function(err){
                console.log("Error: ", err)
            });

      if(vm.profileUser == vm.user.uid){
          vm.selfProfile = true;
          vm.image_upload();
      }
      else{
        vm.selfProfile = false;
      }
      vm.getImageURL(vm.profileUser);
    }

    function setTab(newTab){
      vm.tab = newTab;
    };

    function isSet(tabNum){
      return vm.tab === tabNum;
    };

    function showImageUploadPopup(){
        vm.uploadImgPopUp = true;
    };

    function closepopup(){
        vm.uploadImgPopUp = false;
    };

    function image_upload(){
        var uploader = document.getElementById('uploader');
        var fileButton = document.getElementById('fileButton');
        
        fileButton.addEventListener('change', function(e){
          //Get file
          var file = e.target.files[0];
          
          //Create a storage ref
          var dt = new Date();
          var storageRef = firebase.storage().ref(vm.user.uid);

          vm.usersRef = firebase.database().ref().child('/users').orderByChild('uid').equalTo(vm.user.uid);
          vm.userdb = $firebaseArray(vm.usersRef);
          console.log(vm.userdb)
          //Upload file
          var task = storageRef.put(file);

          //Update progress bar
          task.on('state_changed',
            function progress(snapshot) {
              var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              uploader.value = percentage;
            },
            function error(err) {
              alert("Sorry there was a error while uploading the file...")
              console.log(err)
            },
            function complete() {
              console.log("completed");
              vm.userdb[0].imgupload = true;
              vm.userdb.$save(0).then(function(ref) {
                console.log(ref)
              });
              
              vm.getImageURL(vm.user.uid);
              console.log(vm.userdb[0]);
              vm.uploadImgPopUp = false;
              alert("Image uploaded successfully.");
              uploader.value = 0;
            }
          );
        });
      };
	
      function getImageURL(imgLink){
        vm.showImageLoader = true;
        var storageRef = firebase.storage().ref();
        storageRef.child(imgLink).getDownloadURL().then(function(url) {
        //console.log(url);
        $timeout(function(){
            vm.imgURL = url;
            vm.showImageLoader = false;
        },100);
        }).catch(function(error) {
          // Handle any errors
          console.log(error);
          
        $timeout(function(){
            vm.showImageLoader = false;
        },100);
        });
      };

      vm.init();
}