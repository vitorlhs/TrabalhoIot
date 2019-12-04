angular.module('estoqueApp').config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    $stateProvider.state('dashboard', {
      url: "/dashboard",
      templateUrl: "dashboard/dashboard.html"
    }).state('controleEstoque', {
      url: "/controleEstoque",
      templateUrl: "controleEstoque/tabs.html"
    })

    $urlRouterProvider.otherwise('/dashboard')
  }
])
