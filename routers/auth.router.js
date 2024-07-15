const express = require("express");
const router = express.Router();
const singup = require("../controllers/auth.controllers");

//Singup
router.post("/", singup.register);

module.exports = router;