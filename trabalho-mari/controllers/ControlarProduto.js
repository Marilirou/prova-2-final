const Produto = require("../models/Produto");

exports.criarProduto = async (req, res) => {
  try {
    const novoProduto = new Produto(req.body);
    await novoProduto.save();
    res.status(201).json({ message: "Produto criado com sucesso!", produto: novoProduto });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(400).json({ message: "Erro ao criar produto", error });
  }
};
