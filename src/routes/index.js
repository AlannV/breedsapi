const { Router } = require("express");
const BreedRoutes = require("./breed/breed");
const TemperamentRoutes = require("./temperament/temperament");
const GroupRoutes = require("./group/group");
const CountryRoutes = require("./country/country");

const router = Router();

router.use("/breeds", BreedRoutes);
router.use("/temperaments", TemperamentRoutes);
router.use("/groups", GroupRoutes);
router.use("/countries", CountryRoutes);

module.exports = router;
