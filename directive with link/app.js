(function(){
  'use strict';

  angular.module('ShoppingListDirectiveApp',[])
  .controller('ShoppingListController1',ShoppingListController1)
  .controller('ShoppingListController2',ShoppingListController2)
  // .controller('ShoppingListDirectiveController',ShoppingListDirectiveController)
  .factory('ShoppingListFactory',ShoppingListFactory)
  .directive('shoppingList', ShoppingList)


  function ShoppingList(){
    var ddo = {
      restrict: 'AE',
      templateUrl : "shoppingList.html",
      scope : {
        //one way scope binding
        items: '<',
        //Dom attribute property binding
        title: '@',

        badRemove:'=',

        //bottom up approact using &

        onRemove : '&'
      },
      // controller : 'ShoppingListDirectiveController as list',
      controller : ShoppingListDirectiveController,
      controllerAs : 'list',
      bindToController : true,
      link: ShoppingListDirectoryLink
    };

    return ddo;
  }


  //Link directive deom:
  function ShoppingListDirectoryLink(scope,element,attrs,controller){
    console.log("Link scope is: ",scope);
    console.log("Controller instance is:",controller);
    console.log("Element is:",element);
    scope.$watch('list.cookiesInList()',function(newValue,oldValue){
      console.log("Old value:",oldValue);
      console.log("New value:",newValue);
      if(newValue === true){
        displayCookieWarning();
      }
      else {
        removeCookieWarning();
      }
    });
    function displayCookieWarning(){
      //Using Angular jqLite
      // var warningElem = element.find("div");
      // console.log(warningElem);
      // warningElem.css('display','block');

      //If jQuery included before Angular
      var warningElem = element.find("div.error");
      warningElem.slideDown(900);
    }

    function removeCookieWarning(){
      //Using angular jqLite
      // var warningElem = element.find("div");
      // warningElem.css("display","none");

      //If jQuery included before Angular
      var warningElem = element.find("div.error");
      warningElem.slideUp(900);

    }
  }

  //Directive controllers
  function ShoppingListDirectiveController(){
    var list = this;

    list.cookiesInList = function (){
      for(var i=0; i<list.items.length; i++){
        var name = list.items[i].name;
        if(name.toLowerCase().indexOf("cookie") !== -1)
        {
          return true;
        }
      }
      return false;
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

    list1.itemName = "";

    list1.itemQuantity = "";

    list1.addItem = function(){
      shoppingList.addItem(list1.itemName,list1.itemQuantity);
      list1.title = origTitle + "(" + list1.items.length + " items )";

    }

    list1.removeItem = function(itemIndex){
      console.log("'this' is :",this);
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
