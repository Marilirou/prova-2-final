const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("trabalho_mari", "root", "minhasenha25", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;