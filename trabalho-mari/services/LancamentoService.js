const Lancamento = require('../models/lancamento');

const LancamentoService = {
  listarPorProduto: (produtoId) =>
    Lancamento.findAll({
      where: { produtoId },
      order: [['data', 'ASC']]
    }),

  criar: (dados) => Lancamento.create(dados)
};

module.exports = LancamentoService;
