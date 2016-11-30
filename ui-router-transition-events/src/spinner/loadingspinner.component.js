(function(){
  'use strict';

  angular.module('Spinner')
  .component('loadingSpinner',{
    templateUrl:'src/spinner/loadingspinner.template.html',
    controller:SpinnerController
  });

  SpinnerController.$inject=['$rootScope']
  function SpinnerController($rootScope){
    var $ctrl = this;

    //This cancelers array is used to destroy the every ui state event
    var cancellers = [];

    $ctrl.$onInit = function () {
      var cancel = $rootScope.$on('$stateChangeStart',function(event,toState,toParams,fromState,fromParams,options){
        console.log("Root scope triggered");
        $ctrl.showSpinner = true;
      })

      cancellers.push(cancel);

      cancel = $rootScope.$on('$stateChangeSuccess',function(event,toState,toParams,fromState,fromParams){
        $ctrl.showSpinner = false;
      });

      cancellers.push(cancel);

      cancel = $rootScope.$on('$stateChangeError',function(event,toState,toParams,fromState,fromParams,error){
        $ctrl.showSpinner = false;
      });

      $ctrl.$onDestroy = function(){
        cancellers.forEach(function(item){
          item();
        })
      }

    }
  };

}());
