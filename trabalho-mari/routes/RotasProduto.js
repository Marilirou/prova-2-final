const express = require("express");
const router = express.Router();
const controlador = require("../controllers/ControlarProduto");
const Produto = require("../models/produto");

router.post("/", controlador.criarProduto);

module.exports = router;

//listar produtos
router.get("/", async (req, res) => {
  const produtos = await Produto.find();
  res.json(produtos);
});

//criar novo produto
router.post("/", async (req, res) => {
  const novo = new Produto(req.body);
  await novo.save();
  res.status(201).json(novo);
});

//excluir produto
router.delete("/:id", async (req, res) => {
  await Produto.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

//detalha produto
router.get("/:id", async (req, res) => {
    const produto = await Produto.findById(req.params.id);
    res.json(produto);
  })

  //editar produto
  router.put("/:id", async (req, res) => {
    const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(produto);
  });

module.exports = router;
