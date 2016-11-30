(function(){
  'use strict';

  angular.module('ControllerAsApp',[])
  .controller('ParentController1',ParentController1)
  .controller('ChildController1',ChildController1)
  .controller('ParentController2',ParentController2)
  .controller('ChildController2',ChildController2);

  ParentController1.$inject = ['$scope'];
  function ParentController1($scope){
    console.log(this);
    // $scope.parentValue =1;
    // $scope.pc=this;
    // $scope.pc.parentValue =66;
    // $scope.runFocuesAchieve='satish';
    // //console.log(this);
    // console.log('---');
     //console.log("parent scope:",$scope);
    // console.log('------');
    // console.log(typeof $scope,'Scope type');
    // console.log(typeof $scope.parentValue);
    // console.log(typeof $scope.pc);
    // console.log(typeof $scope.pc.parentValue);
    // console.log('-------');
  }

  ChildController1.$inject = ['$scope'];
  function ChildController1($scope){
    // console.log("$scope.parentValue:",$scope.parentValue);
    // console.log("Child $scope:",$scope);
    //
    // $scope.parentValue = 5;
    // console.log("*** CHANGED: $scope.parentValue = 5 ***");
    // console.log("$scope.parentValue:",$scope.parentValue);
    // console.log("$scope.$parent.parentvalue",$scope.$parent.parentValue)
    // $scope.pc=this;
    // $scope.pc.parentValue='10';
    // console.log("Before change:",$scope.pc.parentValue);
    //
    // console.log("After change:",$scope.pc.parentValue);
    // console.log("Parent object:",$scope.$parent.pc.parentValue);
    // console.log($scope);


  }

  //** Controller AS Syntax
  ParentController2.$inject = ['$scope'];
  function ParentController2($scope){
    var parent = this;
    //parent.value =1;
    console.log(parent);

  }

  ChildController2.$inject = ['$scope'];
  function ChildController2($scope){
    //console.log(child.value);
    //$scope.steve='legend';
    //var child = this;
    //child.value=5;
    //console.log("ChildController2 $scope: ",$scope);
    //console.log("Parent value:",$scope.$parent.parent.value);
    console.log(this.value)
  }

}());
