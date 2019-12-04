(function(){
  angular.module('estoqueApp').controller('DashboardCtrl',[
    '$http',
    DashboardCtrl
  ])

  function DashboardCtrl($http){

    const vm = this
    var itensVencidos = 0
    vm.getSummary = function() {
      const urlSumario = 'http://localhost:3003/api/controleEstoques/datasVencimento'
      $http.get(urlSumario).then(function(response){
        const datasVencimento = response.data.value
        datasVencimento.forEach(function(data){

          if (new Date(data.dataVencimento) < new Date()) {
            itensVencidos++
          }
        })
        vm.itensVencidos = itensVencidos
      })

      const urlCount ='http://localhost:3003/api/controleEstoques/count'
      $http.get(urlCount).then(function(response){
        vm.count = response.data.value
      })
    }

    vm.getSummary()
  }
})()
