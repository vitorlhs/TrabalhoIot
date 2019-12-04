const _ = require('lodash')
const controleEstoque = require('../controleEstoque/controleEstoque')
const now = new Date

function getSummary(req, res){

  controleEstoque.aggregate([{
    $project: { date: "$dataVencimento" }
  }],
  function(error, result){
      if(error){
        res.status(500).json({errors: [error]})
      } else {
        res.json(_.defaults(result[0], {date: new Date(0)}))
      }
    })
}

module.exports = {getSummary}
