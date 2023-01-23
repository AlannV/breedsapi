const { Router } = require("express");
const { getAllTemperaments } = require("../Controlle/temperamentController");

const router = Router();

router.get("/", getAllTemperaments);

module.exports = router;
