const ControleEstoque = require('./controleEstoque')
const _ = require('lodash')

ControleEstoque.methods(['get', 'post', 'put', 'delete'])
ControleEstoque.updateOptions({new: true, runValidators: true})

ControleEstoque.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

function sendErrorsOrNext(req, res, next){
  const bundle = res.locals.bundle

  if(bundle.errors){
    var errors = parseErrors(bundle.errors)
    res.status(500).json({errors})
  } else{
    next()
  }
}

function parseErrors(nodeRestfullErrors){
  const errors = []
  _.forIn(nodeRestfullErrors, error => errors.push(error.message))
  return errors
}

ControleEstoque.route('count',function(req, res, next){
  ControleEstoque.countDocuments(function(error, value){
    if(error){
      res.status(500).json({errors: [error]})
    } else {
      res.json({value})
    }
  })
})

ControleEstoque.route('datasVencimento',function(req, res, next){
  ControleEstoque.find({}, {dataVencimento: 1, _id: 0}, function(error, value){
    if(error){
      res.status(500).json({errors: [error]})
    } else {
      res.json({value})
    }
  })
})

ControleEstoque.route('listarItens', function(req, res, next){
  ControleEstoque.find({},{produto:1, _id:0}, function(error, value){
    if(error){
      res.status(500).json({errors: [error]})
    } else {
      res.json({value})
    }
  })
})

ControleEstoque.route('buscarProduto', function(req,res,next){
  ControleEstoque.find({},{produto:1, _id:0}, function(error, value){
    if(error){
      res.status(500).json({errors: [error]})
    } else {
      res.json({value})
    }
  })
})

module.exports = ControleEstoque
