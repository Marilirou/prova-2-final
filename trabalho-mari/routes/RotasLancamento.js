const express = require("express");
const router = express.Router();
const Lancamento = require("../models/Lancamento");


router.get("/:produtoId", async (req, res) => {
  const lancamentos = await Lancamento.find({ produto: req.params.produtoId }).sort({ data: 1 });
  res.json(lancamentos);
});


router.post("/", async (req, res) => {
  const novo = await Lancamento.create(req.body);
  res.json(novo);
});

module.exports = router;
