const express = require('express')

module.exports = function(server){

  //API routes
  const router = express.Router()
  server.use('/api', router)

  //rotas da API
  const controleEstoqueService = require('../api/controleEstoque/controleEstoqueService')
  controleEstoqueService.register(router, '/controleEstoques')

  const estoqueSummaryService = require('../api/estoqueSummary/estoqueSummaryService')
  router.route('/estoqueSummary').get(estoqueSummaryService.getSummary)
}
