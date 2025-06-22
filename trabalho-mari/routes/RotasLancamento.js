const express = require("express");
const router = express.Router();
const Lancamento = require("../models/lancamento");

// GET todos os lançamentos de um produto
router.get("/:produtoId", async (req, res) => {
  try {
    const lancamentos = await Lancamento.findAll({
      where: { produtoId: req.params.produtoId },
      order: [["data", "ASC"]]
    });
    res.json(lancamentos);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar lançamentos" });
  }
});

// POST novo lançamento
router.post("/", async (req, res) => {
  try {
    const novo = await Lancamento.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao criar lançamento" });
  }
});

module.exports = router;
