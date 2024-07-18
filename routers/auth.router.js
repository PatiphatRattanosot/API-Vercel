const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth.controllers");

//Singup
router.post("/signup", authcontrollers.register);
//SignIn
router.post("/login", authcontrollers.signIn);

module.exports = router;
