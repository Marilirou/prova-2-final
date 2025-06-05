const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
  descricao: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  imagem: {
    type: String
  },
  descricao_complementar: {
    type: String
  },
  preco: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('Produto', ProdutoSchema);
