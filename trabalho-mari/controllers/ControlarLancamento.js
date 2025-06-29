const LancamentoService = require('../services/LancamentoService');

const listarPorProduto = async (req, res) => {
  try {
    const lancamentos = await LancamentoService.listarPorProduto(
      req.params.produtoId
    );
    res.json(lancamentos);
  } catch {
    res.status(500).json({ erro: 'Erro ao buscar lançamentos' });
  }
};

const criar = async (req, res) => {
  try {
    const novo = await LancamentoService.criar(req.body);
    res.status(201).json(novo);
  } catch {
    res.status(500).json({ erro: 'Erro ao criar lançamento' });
  }
};

module.exports = { listarPorProduto, criar };
