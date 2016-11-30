(function(){
'use strict';
angular.module('MsgApp',[])
  .controller('MsgController',MsgController)
  .filter('loves',LovesFilter)
  .filter('truth',TruthFilter);
  MsgController.$inject=['$scope','$filter','lovesFilter','truthFilter'];
  function MsgController($scope,$filter,lovesFilter,truthFilter){
    $scope.name ="Yaakov";
    $scope.stateOfBeing = "face_good";
    $scope.cookieCost = .45;
    $scope.sayMessage = function(){
      var msg ='Yaakov likes to eat healthy snacks at night!';
      var output = $filter('uppercase')(msg);
      return output;
    }
    $scope.feedYaakov=function(){
      $scope.stateOfBeing = "face_goood";
    };
    $scope.sayLovesMessage = function(){
      var msg ='Yaakov likes to eat healthy snacks at night!';
      msg=lovesFilter(msg);
      return msg;
    }
  }
  function LovesFilter(){
    return function(input){
      input=input || "";
      input =input.replace("likes","loves");
      return input;
    };
  }

  function TruthFilter(){
    return function (input,target,replace){
      input = input || "";
      input = input.replace(target,replace);
      return input;
    }
  }
})();
