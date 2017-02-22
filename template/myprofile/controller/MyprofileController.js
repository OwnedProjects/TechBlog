angular.module("TechBlog")
	.controller("MyprofileController", MyprofileController);


function MyprofileController(){
    var vm = this;
    vm.tab = 1;
    vm.tab = null;
    vm.init = init;
    vm.setTab = setTab;
    vm.isSet = isSet;

    function init(){

    }

    function setTab(newTab){
      vm.tab = newTab;
    };

    function isSet(tabNum){
      return vm.tab === tabNum;
    };

    vm.init();
}