const { DataType, DataTypes } = require("sequelize");
const sequelize = require("./db");
//Singleton Pattern
// define DB Schema
const Restaurent = sequelize.define("restaurents", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//focus:true คือการบังคับให้ทั้ง 2 ฝั่งต้องเชื่อมกัน (sync)
Restaurent.sync({ force: false })
  .then(() => {
    console.log("Table Created");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = Restaurent;
