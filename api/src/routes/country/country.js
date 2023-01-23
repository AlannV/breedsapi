const { Router } = require("express");
const { getAllCountries } = require("../../controllers/countryController");

const router = Router();

router.get("/", getAllCountries);

module.exports = router;
