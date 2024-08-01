const express = require("express");
const router = express.Router();
const restaurentController = require("../controllers/restaurent.controllers");
const { authJwt } = require("../middlewares");

//Create a restaurent
router.post(
  "/",
  [authJwt.vertifyToken, authJwt.IsModOrAdmin],
  restaurentController.create
);

//Get all restaurents
router.get("/", restaurentController.getAll);
//Get By ID
router.get("/:id", [authJwt.vertifyToken], restaurentController.getById);
//Update By ID
router.put(
  "/edit/:id",
  [authJwt.vertifyToken, authJwt.IsModOrAdmin],
  restaurentController.update
);
//Delete By ID
router.delete(
  "/delete/:id",
  [authJwt.vertifyToken, authJwt.isAdmin],
  restaurentController.delete
);

module.exports = router;
