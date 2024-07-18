const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth.controllers");
const { verifySignUp } = require("../middlewares/index");

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
//Singup
router.post(
  "/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  authcontrollers.register
);
//SignIn
router.post("/login", authcontrollers.signIn);

module.exports = router;
