const { Temperament } = require("../db");
const { TEMPERAMENTS } = require("../dbFillers/dbTemperaments");

async function getAllTemperaments(req, res, next) {
  try {
    const temperaments = await Temperament.findAll();
    res.status(200).json(temperaments);
  } catch (error) {
    next(error);
  }
}

async function fillTemperaments() {
  const temperaments = Temperament.bulkCreate(
    TEMPERAMENTS.sort().map((t) => {
      return {
        name: t,
      };
    })
  );
  if (!temperaments) {
    throw new Error("The temperaments cannot be loaded into the database");
  } else {
    console.log("Temperaments successfully loaded into the database");
  }
  return temperaments;
}

module.exports = {
  getAllTemperaments,
  fillTemperaments,
};
