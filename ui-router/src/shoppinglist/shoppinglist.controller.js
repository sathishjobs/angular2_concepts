(function(){
  angular.module('ShoppingList')
  .controller('ShoppingListController1',ShoppingListController1)


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


}())
