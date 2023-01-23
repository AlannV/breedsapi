require("dotenv").config();
const { Breed, Temperament, Group, Country } = require("../db");
const { DOGS } = require("../dbFillers/dbBreeds");
const { Op } = require("sequelize");

async function addBreed(request, response, next) {
  let {
    name,
    imageUrl,
    weight,
    height,
    life_span,
    temperament,
    breed_group,
    origin,
  } = request.body;

  const existingBreed = await Breed.findOne({
    where: { name: name },
  });

  if (existingBreed) {
    throw new Error(`Breed with name ${name} already exists`);
  }

  try {
    const breedCreated = await Breed.create({
      name,
      imageUrl,
      weight,
      height,
      life_span,
      temperament,
      breed_group,
      origin,
    });

    const temperamentDb = await Temperament.findAll({
      where: { name: temperament },
    });

    const groupDb = await Group.findOne({
      where: { name: breed_group },
    });

    const countryDb = await Country.findAll({
      where: { name: origin },
    });

    breedCreated.addGroups(groupDb);
    breedCreated.addCountries(countryDb);
    breedCreated.addTemperaments(temperamentDb);

    response.status(200).json(breedCreated);
  } catch (error) {
    next(error);
  }
}

async function getAllBreeds(req, res, next) {
  try {
    const breeds = await Breed.findAll({
      include: [
        {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Country,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Group,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    res.status(200).json(breeds);
  } catch (error) {
    next(error);
  }
}

async function getByName(req, res, next) {
  try {
    const name = req.query.name;

    const dogs = await Breed.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [
        {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Country,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Group,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    res.status(200).json(dogs);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  const { id } = req.params;
  try {
    const breed = await Breed.findByPk(id, {
      include: [
        {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Country,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Group,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });
    res.status(200).json(breed);
  } catch (err) {
    next(err);
  }
}

async function createFunc({
  name,
  imageUrl,
  weight,
  height,
  life_span,
  temperament,
  breed_group,
  origin,
}) {
  try {
    const breedCreated = await Breed.create({
      name,
      imageUrl,
      weight,
      height,
      life_span,
      temperament,
      breed_group,
      origin,
    });

    let groupDb = [];
    let countryDb = [];

    const temperamentDb = await Temperament.findAll({
      where: { name: temperament },
    });

    if (breed_group) {
      groupDb = await Group.findOne({
        where: { name: breed_group },
      });
    }
    if (origin) {
      countryDb = await Country.findAll({
        where: { name: origin },
      });
    }

    breedCreated.addTemperaments(temperamentDb);
    breedCreated.addGroups(groupDb);
    breedCreated.addCountries(countryDb);
  } catch (error) {
    console.error(error);
  }
}

async function fillBreeds() {
  const dogs = DOGS.map((dog) => createFunc(dog));

  if (!dogs) {
    throw new Error("The dog breeds cannot be loaded into the database");
  } else {
    console.log("Dog breeds successfully loaded into the database");
  }
}

module.exports = {
  getAllBreeds,
  addBreed,
  getById,
  fillBreeds,
  getByName,
};
