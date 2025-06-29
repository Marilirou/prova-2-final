const express = require('express');
const router = express.Router();
const LancamentoController = require('../controllers/ControlarLancamento');

router.get('/:produtoId', LancamentoController.listarPorProduto);
router.post('/', LancamentoController.criar);

module.exports = router;
