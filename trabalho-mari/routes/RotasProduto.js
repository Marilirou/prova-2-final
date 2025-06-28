const express = require("express");
const router = express.Router();
const Produto = require("../models/Produto");

const autenticarToken = require("../middlewares/auth");

router.get("/", autenticarToken, async (req, res) => {
  const produtos = await Produto.findAll();
  res.json(produtos);
});

// GET todos os produtos
router.get("/", async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao listar produtos" });
  }
});

// GET produto por ID
router.get("/:id", async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    res.json(produto);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar produto" });
  }
});

// POST novo produto
router.post("/", async (req, res) => {
  try {
    const novo = await Produto.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao criar produto" });
  }
});

// DELETE produto
router.delete("/:id", async (req, res) => {
  try {
    await Produto.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao excluir produto" });
  }
});

// PUT atualizar produto
router.put("/:id", async (req, res) => {
  try {
    await Produto.update(req.body, { where: { id: req.params.id } });
    const atualizado = await Produto.findByPk(req.params.id);
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao atualizar produto" });
  }
});

module.exports = router;
