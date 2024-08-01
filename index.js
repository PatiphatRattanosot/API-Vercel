const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const restaurentRouter = require("./routers/restaurent.router");
const singupRouter = require("./routers/auth.router");
const db = require("./modlels/");
const cors = require("cors");

const corsOption = {
  origin: "http://localhost:5173/",
};
//Dev mode
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and sync DB");
//   initRole();
// });

const initRole = () => {
  const role = db.role;
  role.create({
    id: 1,
    name: "user",
  });
  role.create({
    id: 2,
    name: "moderator",
  });
  role.create({
    id: 3,
    name: "admin",
  });
};
//use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOption));

//use router
//POST http://localhost:3000/api/v1/restaurant
app.use("/api/v1/restaurant", restaurentRouter);
app.use("/api/v1/auth", singupRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello API</h1>");
});

app.listen(PORT, () => {
  console.log("Listening to port 3000");
});
