const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Produto = sequelize.define("Produto", {
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  imagem: DataTypes.STRING,
  descricao_complementar: DataTypes.TEXT,
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Produto;
