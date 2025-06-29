const Produto = require('../models/Produto');

const ProdutoService = {
  listarTodos: () => Produto.findAll(),

  buscarPorId: (id) => Produto.findByPk(id),

  criar: (dados) => Produto.create(dados),

  atualizar: async (id, dados) => {
    const produto = await Produto.findByPk(id);
    if (!produto) throw new Error('Produto não encontrado');
    return produto.update(dados);
  },

  excluir: async (id) => {
    const produto = await Produto.findByPk(id);
    if (!produto) throw new Error('Produto não encontrado');
    return produto.destroy();
  }
};

module.exports = ProdutoService;
