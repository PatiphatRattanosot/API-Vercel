const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Role = sequelize.define("role", {
  // id จะใส่ให้เอง ของsequelize
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Role;
