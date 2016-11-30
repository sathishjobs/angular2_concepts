(function(){
  'use strict';

  angular.module('ControllerAsApp',[])
  .controller('ShoppingListController',ShoppingListController)
  .provider('ShoppingListService',ShoppingListServiceProvider)
  .config(Config);

  Config.$inject = ['ShoppingListServiceProvider'];
  function Config(ShoppingListServiceProvider){
    //override and set the default values
    ShoppingListServiceProvider.defaults.maxItems = 2;
  }

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

  function ShoppingListServiceProvider(){
    var provider = this;
    provider.defaults = {
      maxItems : 10
    };
    provider.$get = function(){
      var shoppingList = new ShoppingListService(provider.defaults.maxItems);
      return shoppingList;
    };
  }

}());
