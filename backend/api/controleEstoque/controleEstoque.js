const restful = require('node-restful')
const mongoose = restful.mongoose

const estoqueSchema = new mongoose.Schema({
  produto: { type: String,  required: [true, "Informe o produto."]},
  dataVencimento: { type: Date, required: [true, "Informe a data de vencimento."]},
  ip: { type: String,  required: [true, "Informe o ip"]},
  rfId: { type: String,  required: [true, "Informe o rfId."]}
})

module.exports = restful.model('ControleEstoques', estoqueSchema)
