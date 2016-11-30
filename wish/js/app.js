(function(){
  'use strict';

  angular.module('friendBirthday',[])
  .controller('wishBot',wishBotController)
  .factory('wishBotFactory',wishBotFactory)
  .directive('responsDirective', responsDirective);

  // wishBotController part
  wishBotController.$inject = ['$timeout'];
  function wishBotController($timeout){
    var bot = this;

    bot.placeholder="Hey who are you !";

    bot.query="";


    bot.process=function(){
      //console.log("without timeout"+bot.query);
      bot.processone();
    }


   bot.processone=function(){
    console.log(bot.query);
  }


  }

  // wishBotFactory part
  function wishBotFactory(){

  }

  //wishBot directive
  function responsDirective(){

  }

}());
