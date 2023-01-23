const { Country } = require("../db");
const { COUNTRIES } = require("../dbFillers/dbCountries");

async function getAllCountries(req, res, next) {
  try {
    const countries = await Country.findAll();
    res.status(200).json(countries);
  } catch (error) {
    next(error);
  }
}

async function fillCountries() {
  const countries = Country.bulkCreate(
    COUNTRIES.map((c) => {
      return {
        name: c,
      };
    })
  );
  if (!countries) {
    throw new Error("The countries cannot be loaded into the database");
  } else {
    console.log("Countries successfully loaded into the database");
  }
  return countries;
}

module.exports = {
  getAllCountries,
  fillCountries,
};
