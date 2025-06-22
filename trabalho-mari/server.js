const express = require("express");
const app = express();
const sequelize = require("./config/db");

app.use(express.json());

// Suas rotas aqui
app.use("/produtos", require("./routes/RotasProduto"));
app.use("/lancamentos", require("./routes/RotasLancamento"));

// Sincroniza o Sequelize com MySQL
sequelize.sync().then(() => {
  console.log("✅ Banco sincronizado com Sequelize!");
});

// 🚨 Esta linha é essencial para o servidor rodar:
app.listen(3000, () => {
  console.log("🚀 Servidor rodando na porta 3000");
});