(function(){
  'use strict';

  angular.module('ShoppingListPromiseApp',[])
  .controller('ShoppingListController',ShoppingListController)
  .service('ShoppingListService',ShoppingListService)
  .service('WeightLossFilterService',WeightLossFilterService);


  //List #1 - controller
  ShoppingListController.$inject = ['ShoppingListService'];
  function ShoppingListController(ShoppingListService){
    var list= this;

    list.items = ShoppingListService.getItems();

    list.itemName = "";

    list.itemQuantity = "";

    list.addItem = function(){
      try{
        ShoppingListService.addItem(list.itemName,list.itemQuantity);
      } catch (error){
        list.errorMessage = error.message;
      }
    }

    list.removeItem = function(itemIndex){
      ShoppingListService.removeItem(itemIndex);
    };
  }

  ShoppingListService.$inject = ['$q','WeightLossFilterService']
  function ShoppingListService($q,WeightLossFilterService){
    var service = this;

    //List of shopping items
    var items = [];
    /** Version one using promise syntax nested **/
    // service.addItem = function(name, quantity) {
    //   var promise = WeightLossFilterService.checkName(name);
    //
    //   promise.then(function(response) {
    //     var nextPromise = WeightLossFilterService.checkQuantity(quantity);
    //
    //     nextPromise.then(function(result) {
    //       var item = {
    //         name: name,
    //         quantity: quantity
    //       };
    //       items.push(item);
    //     }, function(errorResponse) {
    //       console.log(errorResponse.message);
    //     });
    //   }, function(errorResponse) {
    //     console.log(errorResponse.message);
    //   })
    // }

    /** Version two using promise syntax nested **/
  //   service.addItem = function(name,quantity){
  //     var promise = WeightLossFilterService.checkName(name);
  //     promise
  //      .then(function(response){
  //        return WeightLossFilterService.checkQuantity(quantity);
  //      })
  //      .then(function(response){
  //        var item = {
  //          name : name,
  //          quantity : quantity
  //        };
  //        items.push(item);
  //      })
  //      .catch(function(errorResponse){
  //        console.log(errorResponse.message);
  //      });
  //   };
  //
  //
  // };

  /** Version three using promise **/
   service.addItem = function (name,quantity){
     var namePromise = WeightLossFilterService.checkName(name);
     var quantityPromise = WeightLossFilterService.checkQuantity(quantity);

     $q.all([namePromise,quantityPromise])
      .then(function(response){
        var item = {
          name: name,
          quantity : quantity
        };
        items.push(item);
      })
      .catch(function(errorResponse){
        console.log(errorResponse.message);
      })
   }

     //Remove shopping list
     service.removeItem = function(itemIndex){
       items.splice(itemIndex,1);
     };

     //Get all items
     service.getItems = function(){
       return items;
     };


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
      },3000);
      console.log(deferred);
      return deferred.promise;
    }

    service.checkQuantity = function (quantity){
      var deferred = $q.defer();
      var result = {
        message:""
      };

      $timeout(function(){
        //Check for too many boxes
        if(quantity < 6){
          deferred.resolve(result);
        } else {
          result.message = "That is too much, Yaakov !";
          deferred.reject(result);
        }
      },1000);

      return deferred.promise;

    }

  }

}());
