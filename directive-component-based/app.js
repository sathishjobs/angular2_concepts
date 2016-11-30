(function(){
  'use strict';

  angular.module('ShoppingListComponentApp',[])
  .controller('ShoppingListController1',ShoppingListController1)
  .controller('ShoppingListController2',ShoppingListController2)
  // .controller('ShoppingListDirectiveController',ShoppingListDirectiveController)
  .factory('ShoppingListFactory',ShoppingListFactory)
  .component('shoppingList', {
    templateUrl: 'shoppingList.html',
    controller: ShoppingListComponentController,
    bindings:{
      items: '<',
      myTitle:'@title',
      onRemove:'&'
    }

  })


  // function ShoppingList(){
  //   var ddo = {
  //     restrict: 'AE',
  //     templateUrl : "shoppingList.html",
  //     scope : {
  //       //one way scope binding
  //       items: '<',
  //       //Dom attribute property binding
  //       title: '@',
  //
  //       badRemove:'=',
  //
  //       //bottom up approact using &
  //
  //       onRemove : '&'
  //     },
  //     // controller : 'ShoppingListDirectiveController as list',
  //     controller : ShoppingListDirectiveController,
  //     controllerAs : 'list',
  //     bindToController : true,
  //     link: ShoppingListDirectoryLink,
  //     transclude: true
  //   };
  //
  //   return ddo;
  // }




  //Component  controllers
  ShoppingListComponentController.$inject = ['$scope','$element']
  function ShoppingListComponentController($scope,$element){
    var $ctrl = this;

    $ctrl.cookiesInList = function (){
      // console.log($ctrl.items.length);
      for(var i=0; i<$ctrl.items.length; i++){
        var name = $ctrl.items[i].name;
        if(name.toLowerCase().indexOf("cookie") !== -1)
        {
          console.log("cookies detected;");
          return true;
        }
      }
      return false;
      console.log("cookies not detected");
    };

    $ctrl.remove = function (myIndex){
      $ctrl.onRemove({index: myIndex});
    };

    $ctrl.$onInit = function () {
      console.log("We are in $onInit()");
    };

    $ctrl.$onChanges = function (changeObj){
      console.log(changeObj);
    }

    //the below is represent the same as link in directive ddo
    $ctrl.$postLink = function(){
      $scope.$watch('$ctrl.cookiesInList()',function(newValue,oldValue){
        if(newValue === true){
          //Show warning
          var warningElem = $element.find('div.error');
          warningElem.slideDown(900);
        }
        else {
          //Hide warning
          var warningElem = $element.find('div.error');
          warningElem.slideUp(900);
        }
      })
    }

  }


  function ListItemDescription(){
    var ddo = {
      template: '{{item.name}} of {{item.quantity}}'
    };

    return ddo;
  }

  //List #1 - controller
  ShoppingListController1.$inject = ['ShoppingListFactory'];
  function ShoppingListController1(ShoppingListFactory){
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
  }

  ShoppingListController2.$inject = ['ShoppingListFactory'];
  function ShoppingListController2(ShoppingListFactory){
    var list2 = this;

    // Use factory to create new shopping list service
    var shoppingList = ShoppingListFactory(3);

    list2.items = shoppingList.getItems();


    var origTitle="Shopping List #2 (limited to 3 items)";
    list2.title = origTitle + "(" + list2.items.length + " items )";



    list2.itemName ="";

    list2.itemQuentity ="";

    list2.addItem = function(){
        try{
          shoppingList.addItem(list2.itemName,list2.itemQuantity);
          list2.title = origTitle + "(" + list2.items.length + " items )";

        } catch (error){
          list2.errorMessage = error.message;
          console.log(error);
        }
    }

    list2.removeItem = function(itemIndex){
      shoppingList.removeItem(itemIndex);
      list2.title = origTitle + "(" + list2.items.length + " items )";

    };

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

}());
