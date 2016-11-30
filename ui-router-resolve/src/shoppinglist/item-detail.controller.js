(function(){
  'use strict';

   angular.module('ShoppingList')
   .controller('ItemDetailController',ItemDetailController);

   //'Item' is injected through stat's resolve
   ItemDetailController.$inject = ['item']
   function ItemDetailController(item){
     var itemdetail = this;
     itemdetail.name = item.name;
     itemdetail.quantity = item.quantity;
     itemdetail.description = item.description;
   }

}())
