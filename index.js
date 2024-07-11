const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const restaurentRouter = require("./routers/restaurent.router");

//use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use router
//POST http://localhost:3000/api/v1/restaurant
app.use("/api/v1/restaurant", restaurentRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello API</h1>");
});

app.listen(PORT, () => {
  console.log("Listening to port 3000");
});
