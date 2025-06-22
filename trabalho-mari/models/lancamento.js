const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Produto = require("./Produto");

const Lancamento = sequelize.define("Lancamento", {
  tipo: { type: DataTypes.ENUM("entrada", "saida", "balanco"), allowNull: false },
  quantidade: { type: DataTypes.INTEGER, allowNull: false },
  data: { type: DataTypes.DATE, allowNull: false },
  observacao: DataTypes.TEXT
}, {
  timestamps: true,
});

Produto.hasMany(Lancamento, { foreignKey: "produtoId" });
Lancamento.belongsTo(Produto, { foreignKey: "produtoId" });

module.exports = Lancamento;