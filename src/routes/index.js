const { Router } = require("express");
const BreedRoutes = require("./breed");
const TemperamentRoutes = require("./temperament");
const GroupRoutes = require("./group");
const CountryRoutes = require("./country");

const router = Router();

router.use("/breeds", BreedRoutes);
router.use("/temperaments", TemperamentRoutes);
router.use("/groups", GroupRoutes);
router.use("/countries", CountryRoutes);
router.get("/", (req, res, next) => {
  res.status(200).json({ message: "hola" });
});

module.exports = router;
