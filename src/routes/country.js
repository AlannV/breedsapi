const { Router } = require("express");
const { getAllCountries } = require("../Controlle/countryController");

const router = Router();

router.get("/", getAllCountries);

module.exports = router;
