const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Lancamento = sequelize.define("Lancamento", {
  tipo: {
    type: DataTypes.ENUM("entrada", "saida", "balanco"),
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false
  },
  observacao: DataTypes.TEXT,
  produtoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Lancamento;
