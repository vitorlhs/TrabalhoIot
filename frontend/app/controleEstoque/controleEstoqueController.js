(function(){
  angular.module('estoqueApp').controller('ControleEstoqueCtrl', [
    '$http',
    'msgs',
    'tabs',
    ControleEstoqueController
  ])

  function ControleEstoqueController($http, msgs, tabs, $scope) {

    const vm = this
    const url = 'http://localhost:3003/api/controleEstoques'

    vm.refresh = function(){
      $http.get(url).then(function(response){
        vm.controleEstoque = {}
        vm.controleEstoques = response.data
        tabs.show(vm, {tabList: true, tabCreate: true})
      })
    }

    vm.create = function() {
      $http.post(url, vm.controleEstoque).then(function(response){
        vm.refresh()
        msgs.addSuccess('Inclusão realizada com sucesso')
      }).catch(function(response){
        msgs.addError(response.data.errors)
      })
    }

    vm.showTabUpdate = function(controleEstoque){
      vm.controleEstoque = controleEstoque
      tabs.show(vm, { tabUpdate: true })
    }

    vm.showTabDelete = function(controleEstoque){
      vm.controleEstoque = controleEstoque
      tabs.show(vm, { tabDelete: true })
    }

    vm.delete = function(){
      const deleteUrl = `${url}/${vm.controleEstoque._id}`
      $http.delete(deleteUrl, vm.controleEstoque).then(function(response){
        vm.refresh()
        msgs.addSuccess('Item excluido com sucesso!')
      }).catch(function(response){
        msgs.addError(response.data.errors)
      })
    }

    vm.update = function(){
      const updateUrl = `${url}/${vm.controleEstoque._id}`
      $http.put(updateUrl, vm.controleEstoque).then(function(response){
        vm.refresh()
        msgs.addSuccess('Item atualizado com sucesso!')
      }).catch(function(response){
        msgs.addError(response.data.errors)
      })
    }

    vm.ledOn = function(){
      const urlLed = 'http://nodemcu68c63aea4776.local/?ledStatus=0'
      $http.get(urlLed).then(function(response){
        msgs.addSuccess('Ligado')
      })
    }

    vm.ledOff = function(){
      const urlLed = 'http://nodemcu68c63aea4776.local/?ledStatus=1'
      $http.get(urlLed).then(function(response){
        msgs.addSuccess('Desligado')
      })
    }

    vm.buscarProduto = function(produto){
      $http.get(url).then(function(response){

        const dados = response.data
        var produtos = dados.filter(x => x.produto === produto)
        var produtosOrdenados = produtos.sort(function(a, b) {
              var dateA = new Date(a.dataVencimento), dateB = new Date(b.dataVencimento);
              return dateA - dateB;
            });
        var produtoEscolhido = produtosOrdenados.find(x => new Date( x.dataVencimento ) >= new Date())
        var urlLed = `http://nodemcu${produtoEscolhido.ip}.local/?ledStatus=0`
        $http.get(urlLed).then(function(response){
          msgs.addSuccess('Ligado')
        })
        const deleteUrl = `${url}/${produtoEscolhido._id}`
        $http.delete(deleteUrl).then(function(response){
          vm.refresh()
        }).catch(function(response){
          msgs.addError(response.data.errors)
        })
        console.log(produtoEscolhido)
      })
    }

    vm.refresh()
  }
})()
