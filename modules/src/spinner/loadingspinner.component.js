(function(){
  'use strict';

  angular.module('Spinner')
  .component('loadingSpinner',{
    templateUrl:'src/spinner/loadingspinner.template.html',
    controller:SpinnerController
  });
}());

SpinnerController.$inject=['$scope']
function SpinnerController($scope){
  var $ctrl = this;

  var cancelListener = $scope.$on('shoppingList:processing',function(event,data){
    console.log("Event:",event);
    console.log("Data",data);
    if(data.on){
      $ctrl.showSpinner = true;
    }
    else {
      $ctrl.showSpinner = false;
    }
  });

  $ctrl.$onDestroy = function () {
    console.log("listener destroyed");
    cancelListener();
  };
}
