(function(){
  'use strict';

  angular.module('ShoppingList')
  .component('shoppingList', {
    templateUrl: 'src/shoppinglist/shoppingList.html',
    controller: ShoppingListComponentController,
    bindings:{
      items: '<',
      myTitle:'@title',
      onRemove:'&'
    }

  });

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

}())
