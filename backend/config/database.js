const mongoose = require('mongoose')
module.exports = mongoose.connect('mongodb://localhost/db_estoque', { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.Error.messages.general.required = "O atributo {PATH} é obrigatório."
