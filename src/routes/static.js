const express = require("express");
const router = express.Router();
const staticController = require("../controllers/staticController");

router.get("/",staticController.index);

router.get("/marco", (reg, res, next) => {
  res.send("polo");
});

module.exports = router;
