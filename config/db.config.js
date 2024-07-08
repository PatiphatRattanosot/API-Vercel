require("dotenv").config();
module.exports = {
  HOST: "ep-broad-unit-a1rge5tu-pooler.ap-southeast-1.aws.neon.tech",
  USER: "default",
  PASSWORD: "JYea46yCwknc",
  DB: "verceldb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};