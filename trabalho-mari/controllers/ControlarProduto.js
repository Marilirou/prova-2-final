const ProdutoService = require('../services/ProdutoService');

const listarTodos = async (req, res) => {
  try {
    const produtos = await ProdutoService.listarTodos();
    res.json(produtos);
  } catch {
    res.status(500).json({ erro: 'Erro ao buscar produtos' });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const produto = await ProdutoService.buscarPorId(req.params.id);
    if (!produto)
      return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json(produto);
  } catch {
    res.status(500).json({ erro: 'Erro ao buscar produto' });
  }
};

const criar = async (req, res) => {
  try {
    const novo = await ProdutoService.criar(req.body);
    res.status(201).json(novo);
  } catch {
    res.status(400).json({ erro: 'Erro ao criar produto' });
  }
};

const atualizar = async (req, res) => {
  try {
    const atualizado = await ProdutoService.atualizar(req.params.id, req.body);
    res.json(atualizado);
  } catch {
    res.status(400).json({ erro: 'Erro ao atualizar produto' });
  }
};

const excluir = async (req, res) => {
  try {
    await ProdutoService.excluir(req.params.id);
    res.status(204).end();
  } catch {
    res.status(500).json({ erro: 'Erro ao excluir produto' });
  }
};

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  excluir
};
