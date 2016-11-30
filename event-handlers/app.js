(function(){
  'use strict';

  angular.module('ShoppingListComponentApp',[])
  .controller('ShoppingListController1',ShoppingListController1)
  .factory('ShoppingListFactory',ShoppingListFactory)
  .service('WeightLossFilterService',WeightLossFilterService)
  .component('shoppingList', {
    templateUrl: 'shoppingList.html',
    controller: ShoppingListComponentController,
    bindings:{
      items: '<',
      myTitle:'@title',
      onRemove:'&'
    }

  })
  .component('loadingSpinner',{
    templateUrl:'spinner.html',
    controller:SpinnerController
  });

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

  //Component  controllers
  ShoppingListComponentController.$inject = ['$rootScope','$element','$q','WeightLossFilterService'];
  function ShoppingListComponentController($rootScope,$element,$q,WeightLossFilterService){
    var $ctrl = this;
    var totalItems;



    $ctrl.remove = function (myIndex){
      $ctrl.onRemove({index: myIndex});
    };

    $ctrl.$onInit = function () {
      totalItems=0;
      //console.log("We are in $onInit()");
    };

    $ctrl.$onChanges = function (changeObj){
      //console.log(changeObj);
    }

    $ctrl.$doCheck = function (){
      if($ctrl.items.length != totalItems)
      {
        console.log("# of items change. Changes of cookies!");
        totalItems = $ctrl.items.length;

        $rootScope.$broadcast('shoppingList:processing',{on:true});
        var promises =[];
        for(var i=0;i<$ctrl.items.length;i++){
          promises.push(WeightLossFilterService.checkName($ctrl.items[i].name));
        }

        $q.all(promises)
        .then(function(result){
          //Remove cookie warning
          var warningElem = $element.find('div.error');
          warningElem.slideUp(900);
        })
        .catch(function(result){
          //Show cookie warning
          var warningElem = $element.find('div.error');
          warningElem.slideDown(900);
        })
        .finally(function(){
          $rootScope.$broadcast('shoppingList:processing',{on:false});
        });
      }
    }

  }



  //List #1 - controller
  ShoppingListController1.$inject = ['ShoppingListFactory','$rootScope'];
  function ShoppingListController1(ShoppingListFactory,$rootScope){
    var list1= this;

    //Use factory to create new shopping list service
    var shoppingList = ShoppingListFactory();

    list1.items = shoppingList.getItems();

    var  origTitle = " Shopping List #1 ";

    list1.title = origTitle + "(" + list1.items.length + " items )";

    list1.warning = "Cookies Detected!";

    list1.itemName = "";

    list1.itemQuantity = "";

    list1.addItem = function(){
      shoppingList.addItem(list1.itemName,list1.itemQuantity);
      list1.title = origTitle + "(" + list1.items.length + " items )";

    }

    list1.removeItem = function(itemIndex){
      this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
      shoppingList.removeItem(itemIndex);
      list1.title = origTitle + "(" + list1.items.length + " items )";

    };

    $rootScope.$on('shoppingList:processing',function(event,data){
      console.log("Event:",event);
      console.log("Data",data);
      if(data.on){
        console.log("this is from ShoppingListController1")
      }
      else {
        console.log("this is from ShoppingListController1")
      }
    });
  }


  //if not specified , maxitems assumed unlimited
  function ShoppingListService(maxItems){
    var service = this;

    //List of shopping items
    var items =[];

    service.addItem = function(itemName,quantity){
      if((maxItems === undefined) || (maxItems !== undefined) && (items.length < maxItems)){
        var item ={
          name : itemName,
          quantity: quantity
        };
        items.push(item);
        console.log(items);
      } else {
        throw new Error ("Max items("+maxItems+") reached.");
      }
    };

    service.removeItem = function(itemIndex){
      items.splice(itemIndex,1);
    };

    service.getItems = function(){
      return items;
    };
  }

  function ShoppingListFactory(){
    var factory = function(maxItems){
      return new ShoppingListService(maxItems);
    }

    return factory;
  }

  WeightLossFilterService.$inject = ['$q','$timeout'];
  function WeightLossFilterService($q,$timeout){
    var service = this;

    service.checkName = function(name){
      var deferred = $q.defer();
      var result = {
        message:""
      };

      $timeout(function(){
        //Check for cookies
        if(name.toLowerCase().indexOf('cookie') === -1){
          deferred.resolve(result);
        } else {
          result.message = "Stay away from cookies,Yaakov !";
          deferred.reject(result);
        }
      },1000);
      //console.log(deferred);
      return deferred.promise;
    }


  }

}());
