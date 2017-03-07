angular.module("TechBlog")
	.controller("MyProfileController", MyProfileController);

MyProfileController.$inject = ["$firebaseArray", "$rootScope", "$timeout"];

function MyProfileController($firebaseArray, $rootScope, $timeout){
    var vm = this;
    vm.tab = 1;
    vm.uploadImgPopUp = false;
    vm.imgURL = null;
    vm.init = init;
    vm.setTab = setTab;
    vm.isSet = isSet;
    vm.showImageUploadPopup = showImageUploadPopup;
	  vm.closepopup = closepopup;
    vm.image_upload = image_upload;
    vm.getImageURL = getImageURL;

    function init(){
      vm.setTab(1);
      vm.user = $rootScope.user;
      vm.image_upload();
      vm.getImageURL(vm.user.uid);
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
              console.log(vm.userdb[0])
              alert("Image uploaded successfully.")
            }
          );
        });
      };
	
      function getImageURL(imgLink){
        var storageRef = firebase.storage().ref();
        storageRef.child(imgLink).getDownloadURL().then(function(url) {
        console.log(url);
        $timeout(function(){
            vm.imgURL = url;
            console.log(vm.imgURL)
        },100);
        //url: https://firebasestorage.googleapis.com/v0/b/git-blog-4737d.appspot.com/o/1485767556247Lighthouse.jpg?alt=media&token=5a1c5c66-7062-4c0b-80d0-626adf2902f5
        }).catch(function(error) {
          // Handle any errors
          console.log(error)
        });
      };

      vm.init();
}