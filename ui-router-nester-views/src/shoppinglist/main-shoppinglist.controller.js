(function (){
  'use strict';

  angular.module('ShoppingList')
  .controller('MainShoppingListController',MainShoppingListController);

  //This is items injection from ui-router resolve object
MainShoppingListController.$inject = ['items'];
  function MainShoppingListController(items){
    var mainList = this;
    console.log(items);
    mainList.items = items;
  }

}());
