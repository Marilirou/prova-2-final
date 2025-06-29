const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ControlarProduto');

router.post('/', ProdutoController.criar);
router.get('/', ProdutoController.listarTodos);
router.get('/:id', ProdutoController.buscarPorId);
router.put('/:id', ProdutoController.atualizar);
router.delete('/:id', ProdutoController.excluir);

module.exports = router;
