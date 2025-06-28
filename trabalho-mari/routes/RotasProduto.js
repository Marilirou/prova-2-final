const express = require("express");
const router = express.Router();
const Produto = require("../models/Produto");

// Criar produto
router.post("/", async (req, res) => {
  try {
    const novo = await Produto.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erro: "Erro ao criar produto", detalhes: err });
  }
});

// Listar todos os produtos
router.get("/", async (req, res) => {
  try {
    const lista = await Produto.findAll();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar produtos" });
  }
});

// Buscar um produto específico
router.get("/:id", async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
    res.json(produto);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar produto" });
  }
});

// Atualizar produto
router.put("/:id", async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });

    await produto.update(req.body);
    res.json(produto);
  } catch (err) {
    res.status(400).json({ erro: "Erro ao atualizar produto" });
  }
});

// Excluir produto
router.delete("/:id", async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });

    await produto.destroy();
    res.json({ message: "Produto excluído com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao excluir produto" });
  }
});

module.exports = router;
