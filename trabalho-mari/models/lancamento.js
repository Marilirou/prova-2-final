const mongoose = require("mongoose");

const LancamentoSchema = new mongoose.Schema({
  produto: { type: mongoose.Schema.Types.ObjectId, ref: "Produto", required: true },
  quantidade: { type: Number, required: true },
  tipo: { type: String, enum: ["entrada", "saida", "balanco"], required: true },
  data: { type: Date, default: Date.now },
  observacao: { type: String }
});

module.exports = mongoose.model("Lancamento", LancamentoSchema);
