const express = require("express");
const connectDB = require("./config/db");
const produtoRoutes = require("./routes/RotasProduto");
const lancamentoRoutes = require("./routes/RotasLancamento");
const cors = require("cors");


const app = express();
const PORT = 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/produtos", produtoRoutes);
app.use("/lancamentos", lancamentoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});