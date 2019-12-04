(function(){
  angular.module('estoqueApp').filter('dateTime', function(){
    return function(input){

      return new Date(input)
    }
  })
})()
