const express = require("express");
const router = express.Router();
const restaurentController = require("../controllers/restaurent.controllers");

//Create a restaurent
router.post("/", restaurentController.create);

//Get all restaurents
router.get("/", restaurentController.getAll);
//Get By ID
router.get("/:id", restaurentController.getById);
//Update By ID
router.put("/edit/:id", restaurentController.update);
//Delete By ID
router.delete("/delete/:id", restaurentController.delete);

module.exports = router;
