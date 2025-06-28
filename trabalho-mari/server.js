const express = require("express");
const app = express();
const sequelize = require("./config/db");

app.use(express.json());

app.use("/produtos", require("./routes/RotasProduto"));
app.use("/lancamentos", require("./routes/RotasLancamento"));

sequelize.sync().then(() => {
  console.log("✅ Banco sincronizado com Sequelize!");
});

app.listen(3000, () => {
  console.log("🚀 Servidor rodando na porta 3000");
});