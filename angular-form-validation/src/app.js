(function(){
  angular.module("SimpleFormsApp",[])
  .controller('RegistrationController',regformController);

  function regformController(){
    var current=this;
    current.user=[];
    current.completed=false;
    current.submit=function(){
      current.completed=true;
      console.log(current.user);
    };
  }
}())
